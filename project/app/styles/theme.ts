export const theme = {
  colors: {
    primary: '#FF6B6B',     // Canlı mercan rengi
    secondary: '#4ECDC4',   // Turkuaz
    accent: '#FFE66D',      // Parlak sarı
    background: '#FFFFFF',  // Beyaz
    text: '#2C3E50',       // Koyu mavi-gri
    success: '#95E1D3',    // Soft yeşil
    error: '#FF8B8B',      // Soft kırmızı
    warning: '#FFD93D',    // Parlak sarı
    info: '#A8E6CF',       // Soft mint
  },
  fonts: {
    regular: 'Nunito_400Regular',
    medium: 'Nunito_500Medium',
    bold: 'Nunito_700Bold',
  },
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
  },
  borderRadius: {
    small: 8,
    medium: 12,
    large: 20,
    round: 999,
  },
  shadows: {
    small: {
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.15,
      shadowRadius: 3.84,
      elevation: 3,
    },
    medium: {
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 4,
      },
      shadowOpacity: 0.2,
      shadowRadius: 5.46,
      elevation: 5,
    },
  },
  animations: {
    button: {
      scale: 0.95,
      duration: 100,
    },
  },
}; 