#!/usr/bin/env python3
"""Fix all blog meta.json files - remove BOM, normalize encoding, ensure clean JSON."""
import json
import os
import glob

blog_dir = os.path.join(os.path.dirname(os.path.dirname(__file__)), "app", "blog")

for meta_path in sorted(glob.glob(os.path.join(blog_dir, "*", "meta.json"))):
    slug = os.path.basename(os.path.dirname(meta_path))
    try:
        # Read with BOM-safe encoding
        raw = open(meta_path, "rb").read()
        # Strip BOM if present
        if raw.startswith(b'\xef\xbb\xbf'):
            raw = raw[3:]
        # Strip null bytes
        raw = raw.replace(b'\x00', b'')
        text = raw.decode("utf-8").strip()
        if not text:
            print(f"EMPTY: {slug}")
            continue
        data = json.loads(text)
        # Write clean UTF-8 without BOM
        with open(meta_path, "w", encoding="utf-8", newline="\n") as f:
            json.dump(data, f, indent=2, ensure_ascii=False)
            f.write("\n")
        print(f"OK: {slug}")
    except Exception as e:
        print(f"ERR: {slug} - {e}")

print("\nDone")
