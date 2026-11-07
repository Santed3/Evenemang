# Kvitt

Kvitt is a Swedish event-discovery MVP in test phase:
https://project32467.websitepublisher.ai

## Current product scope

- Browse and search published upcoming events across Sweden.
- Filter by event category and date.
- Open an event detail page and save it locally in the browser.
- Send an RSVP or ticket-interest request.
- Submit an event for manual review before publication.
- Open the event location in Google Maps.

Ticket checkout, payments, user accounts and ticket resale are not implemented. An interest request is not a ticket or reservation.

## Pages and assets

- `index.html`: event listing, search and filters
- `event.html`: event details, save and interest form
- `lagg-upp.html`: event submission form
- `villkor.html`: terms and privacy information
- `kvitt.js`: shared frontend helpers and public Supabase event reads
- `_fragment/`: shared CSS, header and footer fragments

## Data and form handling

- The public event catalogue is read from the Kvitt Supabase project ref `sxacyaureudlvijiykqx`.
- Example/demo events are filtered out of the public listing.
- RSVP and event-submission forms use WebsitePublisher's server-side form handling and lead capture, with per-session submission limits and a honeypot field.
- Review form submissions in WebsitePublisher Dashboard → Leads. Approved events still need to be published to the Supabase `events` table.
- The Supabase project used by Kvitt must be connected to the Supabase management integration before its schema, RLS policies and writes can be audited or changed.
- Do not use the separate ScreenBubble Supabase project for Kvitt.

## Launch checklist

- Connect the correct Kvitt Supabase project and verify the `events` schema, read policies and publish workflow.
- Test one real event end-to-end, including an RSVP and an organizer submission.
- Add the data controller's name and contact email to the privacy page.
- Review data retention and privacy terms before inviting the public.
- Keep search indexing disabled until the owner explicitly enables it.
