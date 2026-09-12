# Structure Memo

Use a compact memo for a complex visual composition or an unclear hierarchy. Select only the fields that affect the design; these are prompts for decisions, not mandatory output headings.

| Decision | Record |
| --- | --- |
| Main blocks | Major sections in visual order |
| Dominant relationship | Stack, split, repeated grid, layer, or float |
| Width ownership | The outer width constraint and any separate prose measure |
| Overlap | Which elements cross a boundary, or that there is no overlap |
| Repeated unit | Card, row, pricing column, chip, or another concrete unit |
| Image role | Backdrop, framed media, side visual, or decorative layer |
| Typography | Heading, body, metadata, and other relevant roles |
| Responsive behavior | Observed changes and material assumptions for unseen widths |

After consulting the relevant docs, append the primitive composition and token choices to the same memo. Include an alternative and its tradeoff only when it helps resolve an actual ambiguity.

Example:

```text
Hero: foreground copy over a photo, with three cards crossing its lower edge.
Structure: Layers for the overlap; Container for copy width; ResponsiveGrid for cards.
Width: Text only for the paragraph, not the whole hero.
Docs: patterns.mdx (Layered Hero), plus the selected primitive pages.
Typography: 4xl/5xl heading with fluid typography; m body.
Spacing: choose the closest documented gap/padding step after checking the image.
Responsive assumption: cards stack when the documented column minimum no longer fits.
```

Resolve missing facts that materially change the layout before committing to that part of the structure. Minor assumptions do not require stopping the rest of the work. Carry this memo into implementation without repeating it as a separate final report.
