export const formatCurrency = (v) => {
    if (isNaN(Number(v))) return '0';
    
    const absValue = Math.abs(v);
    const suffix = v < 0 ? '-' : '';
    const prefix = '';
    
    if (absValue >= 1_000_000_000) {
      const billions = absValue / 1_000_000_000;
      return `${suffix}${prefix}${billions % 1 === 0 ? billions.toFixed(0) : billions.toFixed(2)}B`;
    }
    if (absValue >= 1_000_000) {
      const millions = absValue / 1_000_000;
      return `${suffix}${prefix}${millions % 1 === 0 ? millions.toFixed(0) : millions.toFixed(2)}M`;
    }
    if (absValue >= 1_000) {
      const thousands = absValue / 1_000;
      return `${suffix}${prefix}${thousands % 1 === 0 ? thousands.toFixed(0) : thousands.toFixed(2)}K`;
    }
    
    return `${suffix}${prefix}${absValue.toFixed(absValue % 1 === 0 ? 0 : 2)}`;
  };