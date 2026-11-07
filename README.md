# Kvitt

Kvitt is a Swedish event discovery prototype published at https://project32467.websitepublisher.ai.

## Pages
- `index.html`: event listing and filters
- `event.html`: event details and RSVP/ticket-interest
- `lagg-upp.html`: event submission form
- `villkor.html`: terms/privacy
- `kvitt.js`: shared frontend helper
- `_fragment/`: shared CSS, header and footer fragments from WebsitePublisher

## Database
The frontend currently points at a Supabase project ref `sxacyaureudlvijiykqx`. Database schema and seed data must be confirmed against the original Kvitt Supabase project before deploying any migration. Do not use ScreenBubble's Supabase project.

## Status
Prototype only. Real ticket checkout/resale is not implemented. Example events should be clearly labeled.
