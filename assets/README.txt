# SkillNest Local SVG Icon Pack

This folder contains reusable Lucide-style SVG icons for SkillNest.

## Installation
1. Extract the `assets` folder into the root of your SkillNest project.
2. Your project should contain `assets/icons/*.svg`.
3. Reference icons from root pages with `assets/icons/menu.svg`.
4. Reference icons from one-level nested pages with `../assets/icons/menu.svg`.

## Example HTML
<img src="assets/icons/menu.svg" class="ui-icon" alt="" aria-hidden="true">

## Suggested CSS
.ui-icon {
  width: 22px;
  height: 22px;
  display: inline-block;
  vertical-align: middle;
  flex: 0 0 auto;
}

Note: SVG files use `currentColor`. For consistent theming, use them as inline SVG
or apply CSS filters to image elements if needed. Do not use emoji as UI icons.
