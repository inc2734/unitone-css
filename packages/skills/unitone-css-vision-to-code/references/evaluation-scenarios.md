# Evaluation Scenarios

Use these scenarios when revising the skills or comparing outputs. Read this file for evaluation only. Keep inputs, framework version, and available documentation consistent between comparisons.

## Assess the result

Evaluate observable outcomes, not the presence of particular headings or the number of alternatives listed:

- Imports, primitive names, props, utilities, and tokens exist in the current source.
- React uses component props and `className`; HTML uses the corresponding layout tokens, custom properties, and unescaped utility class names.
- Width constraints, actual overlap, repeated units, and responsive behavior match the requested structure.
- First-pass markup uses primitives, props, tokens, and utilities without new custom classes, selectors, or decorative inline styles.
- Assumptions and material omissions are clear; a minor uncertainty does not block unrelated work.
- The response contains the requested deliverable without unnecessary analysis reports.

For implementation cases, check imports and rendered attributes/styles using the project tooling. When a rendering environment is available, compare wide and narrow views for overflow, stacking, measure, and overlap. Record source/API checks separately from visual checks; do not claim visual equivalence from source inspection alone.

Report the output, failures with concrete examples, unverified behavior, and the documentation inspected. When comparing revisions, also record redundant reading, unnecessary questions, and response length. Shorter output is useful only if correctness is preserved.

## Scenario A: layered hero

Full-width background photo with foreground heading, body copy, and two CTA buttons. Three equal feature cards cross the lower edge of the hero.

Check that overlap is expressed within an appropriate shared composition, the cards repeat consistently, and readable text does not unintentionally constrain the entire hero. Compare `Cover` and `Layers` when deciding the structure.

## Scenario B: article with sidebar

Main article on the left, narrow author/share sidebar on the right, a wide image near the top with a small overlapping category badge, and two columns of related cards below.

Check right-sidebar semantics, intentional prose measure, and the small badge's actual overlap. Confirm the sidebar and card list have appropriate narrow-width behavior.

## Scenario C: pricing section

Heading and lead followed by three equal pricing columns. The middle plan has a stronger background. Each column contains a plan name, price, bullet list, and CTA. Stack the columns on mobile; there is no overlap.

Check the repeated layout, documented responsive behavior, token-backed emphasis, and that no unnecessary layering is introduced. Validate both React and plain HTML API spelling across the visual scenarios.

## Focused workflow checks

- Change only a button's documented font size: use coding guidance without requiring image analysis or a full-page memo.
- Produce an analysis-only hero mapping: return the requested composition without implementing code.
- Work from one viewport with several minor assumptions: proceed on clear structure, identify important assumptions, and ask only for decisions that change the result materially.
- Add a framework React prop: use the primitive workflow; emitting `data-unitone-layout` inside the component is expected.
- Change an observer-backed behavior: account for aggregate and individual imports, disposal, pending work, and reinsertion.
- Update MCP installation instructions: edit `packages/mcp/README.md`, synchronize generated MDX, then regenerate the AI summary if affected.
