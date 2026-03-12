/**
 * ESPN Fantasy Proxy Worker
 * Deploys to Cloudflare Workers — forwards ESPN API requests with cookie auth
 * https://developers.cloudflare.com/workers/
 */

const ALLOWED_ORIGIN = "*"; // Lock this down to your domain if desired

addEventListener("fetch", (event) => {
  event.respondWith(handleRequest(event.request));
});

async function handleRequest(request) {
  // Handle CORS preflight
  if (request.method === "OPTIONS") {
    return new Response(null, {
      headers: {
        "Access-Control-Allow-Origin": ALLOWED_ORIGIN,
        "Access-Control-Allow-Methods": "POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
        "Access-Control-Max-Age": "86400",
      },
    });
  }

  if (request.method !== "POST") {
    return new Response("Method not allowed", { status: 405 });
  }

  let body;
  try {
    body = await request.json();
  } catch {
    return jsonError("Invalid JSON body", 400);
  }

  const { leagueId, year, espn_s2, swid } = body;

  if (!leagueId || !year) {
    return jsonError("leagueId and year are required", 400);
  }

  const url =
    `https://lm-api-reads.fantasy.espn.com/apis/v3/games/ffl/seasons/${year}/segments/0/leagues/${leagueId}?view=mRoster&view=mTeam`;

  const headers = {
    "User-Agent":
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
    Accept: "application/json",
  };

  if (espn_s2 && swid) {
    headers["Cookie"] = `espn_s2=${espn_s2}; SWID=${swid}`;
  }

  let espnRes;
  try {
    espnRes = await fetch(url, { headers });
  } catch (err) {
    return jsonError("Failed to reach ESPN API: " + err.message, 502);
  }

  if (!espnRes.ok) {
    return jsonError(
      `ESPN returned ${espnRes.status}. Check your League ID and cookies.`,
      espnRes.status
    );
  }

  const data = await espnRes.json();

  return new Response(JSON.stringify(data), {
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": ALLOWED_ORIGIN,
    },
  });
}

function jsonError(message, status) {
  return new Response(JSON.stringify({ error: message }), {
    status,
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": ALLOWED_ORIGIN,
    },
  });
}
