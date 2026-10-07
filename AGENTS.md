<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

## ELIA architecture
- Keep ELIA as a client-only visual prototype with static local mock data; no persistence or network-backed business services are required.
- Each requested view is a file-based leaf route, with the operation list as an index sibling of the folio detail; this keeps the dossier independently navigable.
- Use shared presentation components and semantic CSS tokens for all ELIA pages; this maintains a coherent institutional design.
- Render the Mexico map from bundled state boundary paths with local SVG route overlays, Bezier-positioned vehicle progress and local selectable dossiers; no mapping service is needed.
- Derive contextual labels and shared flow/timeline stages from each local operation; this keeps map dossiers and full operation detail consistent.
- Carrier tracking (unified states, event sources, automatic alerts, integrations, cold chain) lives as static records keyed by folio in the shared mock data module; this lets map, dashboard, incidents and dossier tabs stay consistent.
