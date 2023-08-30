const {
  missionCenterColors,
  missionCenterBackgroundColor,
  missionCenterBorderColor,
  missionCenterBackgroundImage
} = require('./missionCenter');
const { courseBackgroundImage, courseThemeColors } = require('./course');
const { layoutThemeColors } = require('./layout');
const { landingThemeColors } = require('./landing');
const { settingThemeColors } = require('./setting');
const { notionRendererThemeColors } = require('./notionRenderer');
const {
  lessonThemeColors,
  lessonThemeBackgroundColor,
  lessonThemeBorderColor
} = require('./lesson');
const {
  homeThemeColors,
  homeThemeBackgroundColor,
  homeThemeBorderColor
} = require('./home');
const { authThemeColors } = require('./auth');

const themeColors = {
  'primary-color': 'var(--primary-green-yellow)',
  'default-global-bg': 'var(--default-global-bg)',
  'neutral-dark-gray': 'var(--neutral-dark-gray)',
  'neutral-light-gray': 'var(--neutral-light-gray)',
  'neutral-off-white': 'var(--neutral-off-white)',
  'neutral-white': 'var(--neutral-white)',
  'neutral-medium-gray': 'var(--neutral-medium-gray)',
  'neutral-black': 'var(--neutral-black)',
  'text-default-color': 'var(--text-default-color)',
  'text-second-color': 'var(--text-second-color)',
  ...layoutThemeColors,
  ...landingThemeColors,
  ...missionCenterColors,
  ...courseThemeColors,
  ...settingThemeColors,
  ...notionRendererThemeColors,
  ...lessonThemeColors,
  ...authThemeColors,
  ...homeThemeColors
};

const backgroundImage = {
  ...courseBackgroundImage,
  ...missionCenterBackgroundImage
};

const backgroundColor = {
  ...missionCenterBackgroundColor,
  ...lessonThemeBackgroundColor,
  ...homeThemeBackgroundColor
};

const borderColor = {
  ...missionCenterBorderColor,
  ...lessonThemeBorderColor,
  ...homeThemeBorderColor
};

module.exports = {
  themeColors,
  backgroundImage,
  backgroundColor,
  borderColor
};
