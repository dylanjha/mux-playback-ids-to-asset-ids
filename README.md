# [DEPRECATED]

This is no longer needed, Mux added an endpoint to look up a playback ID and retrieve the asset ID or live stream ID. See more here: https://docs.mux.com/api-reference/video#operation/get-asset-or-livestream-id

## Map playback ids to assets

```
MUX_TOKEN_ID=xxx MUX_TOKEN_SECRET=xx yarn start
```

This will create a file called `playback_ids.json`. It will look like this:

```
{
  "playback-id-123": "assset-id-12345",
  "playback-id-456": "assset-id-6789"
  ....
}
```

Note that an asset can have multiple playback ids, and therefore, you might
have multiple different playback ids that point to the same asset.

# How it works

This will request all of your assets from Mux, one page at a time and map
all the playback ids to their assets
