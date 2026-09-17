# Deploying the photo pre-check as a live API

You don't have a backend yet and no cloud provider picked -- so the
shortest path is: put this in a Docker container, deploy that container to
a platform that gives you a URL, point your website at that URL. This doc
covers that end to end.

**What I verified vs. didn't:** I ran the actual API (`app.py`) directly
and confirmed the endpoints work correctly against real test photos (see
the request/response examples below -- those are real, not illustrative).
I could NOT test-build the Docker image itself in this sandbox --
Docker Hub is blocked here by a network restriction specific to this
environment. The Dockerfile follows standard, well-tested patterns, but
you should run `docker build .` yourself once (locally, or let the hosting
platform build it) and watch for errors before treating this as fully
proven. If the build fails, paste me the error and I'll fix it.

## What's being deployed

`app.py` -- a small FastAPI wrapper around `validate_full.validate()` --
already tested working:

```
POST /photo-check   (multipart form, field name "photo") -> {"ok": true}
                                                           or {"ok": false, "failures": [...], "reasons": [...]}
GET  /healthz        -> {"status": "ok"}          (liveness)
GET  /readyz          -> {"status": "ready"}       (models loaded)
```

Real output from testing this locally:

```
curl -F "photo=@good_photo.jpg" http://localhost:8000/photo-check
{"ok":true}

curl -F "photo=@no_face.jpg" http://localhost:8000/photo-check
{"ok":false,"failures":["no_face_detected"],"reasons":["We couldn't detect a face in this photo..."]}
```

## Step 0: get this into a git repo

Whichever platform you pick, it deploys from a git repo (GitHub is the
common one). Push this whole `tddfa_pose_module` folder to a new GitHub
repo -- private is fine, these platforms support private repos.

The Dockerfile fetches the 3 large model files during the build (from the
public 3DDFA_V2 repo), so you do NOT need to commit those ~25MB files
yourself -- just push the folder as-is.

## Recommended for right now: Render.com

Reasoning: you have no existing infra, this is a POC under time pressure,
and Render's whole pitch is "point me at a Dockerfile, I'll give you a
URL" with essentially no DevOps knowledge required. Free tier exists;
paid starts at $7/month for something that doesn't sleep.

1. Sign up at render.com, connect your GitHub account.
2. **New +** -> **Web Service** -> pick the repo you pushed in Step 0.
3. Render should auto-detect the `Dockerfile`. If it asks: Environment =
   Docker, region = whatever's closest to your users, instance type =
   the free tier is fine to prove this works, but see the cold-start note
   below before using free tier for anything real users touch.
4. Set the environment variable `ALLOWED_ORIGINS` to your actual website
   domain (e.g. `https://velura.com`) once you have one -- this controls
   which sites are allowed to call the API from a browser. Leave unset
   (defaults to `*`, allow-all) while you're just testing.
5. Deploy. First build will take a few minutes (installing torch etc. +
   cloning the model weights). Render gives you a URL like
   `https://velura-photo-check.onrender.com`.
6. Confirm it's alive: `curl https://velura-photo-check.onrender.com/healthz`

**Free tier cold-start warning:** Render's free tier spins the service
down after ~15 minutes of no traffic. The next request has to wait for it
to spin back up (tens of seconds) PLUS this app's own ~6s model load on
top of that. That's a bad experience for a real user uploading a photo.
Fine for testing/demoing to yourself; upgrade to a paid always-on instance
before pointing real traffic at it.

## Alternative: Railway.app

Nearly identical flow to Render -- connect GitHub repo, it detects the
Dockerfile, deploys, gives you a URL. Similar pricing shape (usage-based,
no forced sleep on the same terms as Render's free tier). Worth comparing
pricing once you know real usage volume; functionally either is fine to
start with.

## Alternative if you outgrow this: Google Cloud Run

More setup (you need a GCP account and project), but it's a stronger fit
long-term: true pay-per-request pricing, and you can set
`--min-instances=1` to keep one instance always warm (no cold start) while
still scaling up automatically under load. Worth switching to once you
have a GCP account for other reasons or Render/Railway costs start adding
up -- not worth the extra setup for a POC that needs to exist tomorrow.

## Connecting your website to this

Once deployed, your frontend calls it like any other API:

```javascript
async function checkPhoto(file) {
  const formData = new FormData();
  formData.append("photo", file);

  const res = await fetch("https://velura-photo-check.onrender.com/photo-check", {
    method: "POST",
    body: formData,
  });
  const result = await res.json();

  if (!result.ok) {
    // result.reasons is an array of user-facing messages, e.g.
    // "Please face the camera more directly (avoid a side profile)."
    showErrorsToUser(result.reasons);
    return false;
  }
  return true;
}
```

Call this before you send the photo into the actual hair try-on/generation
step -- reject early, don't waste a generation call on a photo that was
never going to work.

## Before this touches real users

Same flag as the handoff note: this service has no concept of the age of
the person in the photo. Hosting it doesn't change that. Don't wire your
live upload flow to send real user photos through this into the
generation pipeline until there's an actual age-gating/consent mechanism
at the account layer -- see `HANDOFF.md` for the full explanation.
