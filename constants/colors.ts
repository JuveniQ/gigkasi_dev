const colors = {
  // Primary Teal Palette
  primary: '#004D40',       // Main dark teal
  primaryDark: '#00251A',   // Darker teal
  primaryLight: '#39796B',  // Medium teal
  primary50: '#E0F2F1',     // Very light teal (backgrounds)
  primary100: '#B2DFDB',    // Light teal
  primary200: '#80CBC4',    // Soft teal
  
  // Secondary Teal/Blue
  secondary: '#00897B',     // Your supporting teal
  secondaryDark: '#00695C', // Darker supporting
  secondaryLight: '#4DB6AC',// Lighter supporting
  secondary50: '#E0F7FA',   // Very light cyan
  
  // Accent Colors
  accent: '#00BFA5',        // Vibrant teal for highlights
  accentDark: '#00897B',    // Darker accent
  accentLight: '#64FFDA',   // Light accent (for floating actions)
  
  // Status Colors (harmonized with teal)
  success: '#00C853',       // Green
  warning: '#FFAB00',       // Amber
  error: '#FF5252',        // Red
  info: '#00B8D4',         // Cyan
  
  // Neutrals
  white: '#FFFFFF',
  black: '#000000',
  gray50: '#FAFAFA',        // Lightest gray
  gray100: '#F5F5F5',      
  gray200: '#EEEEEE',       // Borders
  gray300: '#E0E0E0',      
  gray400: '#BDBDBD',       // Disabled
  gray500: '#9E9E9E',      
  gray600: '#757575',       // Secondary text
  gray700: '#616161',      
  gray800: '#424242',       // Primary text
  gray900: '#212121',       // Dark text
  
  // Backgrounds
  background: '#FAFAFA',    // Main background
  surface: '#FFFFFF',       // Cards/surfaces
  overlay: 'rgba(0,77,64,0.8)', // Teal overlay
  
  // Text
  textPrimary: '#212121',   // Main text
  textSecondary: '#757575', // Secondary
  textOnPrimary: '#FFFFFF', // White on teal
  textOnSecondary: '#FFFFFF',
  
  // Borders
  border: '#E0E0E0',        // Default
  borderLight: '#EEEEEE',   // Light borders
  borderDark: '#BDBDBD',    // Dark borders
  
  // Social Colors
  google: '#DB4437',
  facebook: '#4267B2',
  apple: '#000000',
  
  // Elevation
  shadow: 'rgba(0,77,64,0.1)', // Teal tinted shadow
  backdrop: 'rgba(0,77,64,0.3)',

  main: null,
  support: null,
  highlight: null,
  disabled: null,
  divider: null,
  teal: null
};


// Semantic Aliases
colors.main = colors.primary;
colors.support = colors.secondary;
colors.highlight = colors.accent;
colors.disabled = colors.gray400;
colors.divider = colors.gray200;

// Material Teal Palette Names
colors.teal = {
  50: '#E0F2F1',
  100: '#B2DFDB',
  200: '#80CBC4',
  300: '#4DB6AC',
  400: '#26A69A',
  500: '#009688', // Classic material teal
  600: '#00897B', // Your supporting color
  700: '#00796B',
  800: '#00695C',
  900: '#004D40'  // Your main color
};

export default colors;