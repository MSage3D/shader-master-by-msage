# Changelog

## 0.4.37

- Reworked locked shaders into a portable companion set instead of embedding every support feature into one oversized `.shader` file.
- Kept the complete Shader Master material UI when the authoring package is installed, with a lightweight portable inspector when only the locked shader folder is present.
- Added a portable **Unlock Optimized Shader** workflow that restores editable Shader Master source from editor-only recovery files beside the locked shader.
- Generated only the optimized include files required by each locked shader; disabled optional passes no longer bring along unused include files.
- Kept recovery sources as `.txt` editor assets so the full feature source is not compiled or uploaded while the material remains locked.
- Updated VRChat avatar preprocessing to accept already-locked standalone materials when the full Shader Master authoring package is absent.
- Prevented missing authoring sources from escaping the upload callback as an exception.
- Increased the optimizer version so older locked materials rebuild into the portable companion format when re-locked.

## 0.4.36

- Added dedicated **Outline Size Mask** textures for Simple, Rim, Doodle Noise, and Sticker outlines.
- Separated outline opacity masking from outline thickness masking, so the existing Outline Mask now controls visibility without shrinking the outline.
- Fixed Rim outline masking so transparent areas fade correctly while preserving the configured rim width and softness.
- Applied Sticker outline size masking consistently to both the front and back outline layers.

## 0.4.35

- Made optimized shader locking automatic during VRChat avatar preprocessing.
- Added **4. Lock all optimized Shader Master Materials** under the MSage menu for precompiling every Shader Master material in the project.
- Moved the material **Lock Optimized Shader** and **Unlock Optimized Shader** controls below the update and Discord support links.
- Made Toggle Target labels green and preserved their properties from optimized-shader locking so animated toggles remain functional in-game.
- Added the VRC Toggle Tools guidance note explaining how to mark features as Toggle Targets.
- Fixed Hyper Cell and Hyper Realistic shadow behavior in mirrors and the VRChat camera by falling back to Cell Shading and Realistic shading respectively.

## 0.4.32

- Added **Lock Optimized Shader** and **Unlock Optimized Shader** controls to the material inspector.
- Added automatic optimized shader locking during VRChat avatar preprocessing, enabled by default.
- Added animation-aware optimization that preserves animated properties and materials swapped by animation clips.
- Added cached optimized shader reuse while stripping unused optional passes and fixed feature variants.

## 0.4.31

- Renamed the product and shader branding to Shader Master by MSage.
- Rebuilt Creator Tools around Material Tools, VRC Toggle Tools, and Settings & Presets.
- Added multi-material targeting, drag-and-drop selection, non-destructive conversion, and Quest material generation.
- Added persistent right-click Toggle Targets and deterministic animation clip generation/merging.
- Added generated Radial Puppet, On/Off, and Dissolve FX workflows.
- Added expression parameter creation, default toggle-state controls, menu selection/creation, and Write Defaults On for generated states.
- Added editor-only AudioLink preview controls with upload/build safety resets.
- Added the material-inspector update checker.
