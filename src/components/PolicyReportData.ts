// Comprehensive data model for Policy Reports with state × scheme × year × gender × locality dimensions

export interface PolicyDataPoint {
  state: string;
  scheme: string;
  year: string;
  gender: 'male' | 'female' | 'all';
  locality: 'rural' | 'urban' | 'all';
  beneficiaries: number;
  budget: number;
  utilization: number;
  enrollment?: number;
  dropout?: number;
  literacy?: number;
}

// Comprehensive dataset with cross-dimensional data
export const policyDatabase: PolicyDataPoint[] = [
  // Punjab NSP Data
  { state: 'Punjab', scheme: 'NSP 2.0', year: '2024', gender: 'female', locality: 'rural', beneficiaries: 42500, budget: 850, utilization: 94, enrollment: 45000, dropout: 8.2, literacy: 78 },
  { state: 'Punjab', scheme: 'NSP 2.0', year: '2024', gender: 'female', locality: 'urban', beneficiaries: 28000, budget: 560, utilization: 92, enrollment: 30000, dropout: 6.5, literacy: 85 },
  { state: 'Punjab', scheme: 'NSP 2.0', year: '2024', gender: 'male', locality: 'rural', beneficiaries: 38000, budget: 760, utilization: 90, enrollment: 42000, dropout: 7.8, literacy: 82 },
  { state: 'Punjab', scheme: 'NSP 2.0', year: '2024', gender: 'male', locality: 'urban', beneficiaries: 25000, budget: 500, utilization: 89, enrollment: 28000, dropout: 6.0, literacy: 88 },
  { state: 'Punjab', scheme: 'NSP 2.0', year: '2023', gender: 'female', locality: 'rural', beneficiaries: 31500, budget: 630, utilization: 88, enrollment: 38000, dropout: 10.5, literacy: 75 },
  
  // Delhi NSP Data
  { state: 'Delhi', scheme: 'NSP 2.0', year: '2024', gender: 'female', locality: 'rural', beneficiaries: 12000, budget: 240, utilization: 96, enrollment: 13000, dropout: 5.2, literacy: 90 },
  { state: 'Delhi', scheme: 'NSP 2.0', year: '2024', gender: 'female', locality: 'urban', beneficiaries: 68000, budget: 1360, utilization: 95, enrollment: 72000, dropout: 4.8, literacy: 92 },
  { state: 'Delhi', scheme: 'NSP 2.0', year: '2024', gender: 'male', locality: 'rural', beneficiaries: 11000, budget: 220, utilization: 94, enrollment: 12000, dropout: 5.0, literacy: 91 },
  { state: 'Delhi', scheme: 'NSP 2.0', year: '2024', gender: 'male', locality: 'urban', beneficiaries: 62000, budget: 1240, utilization: 93, enrollment: 66000, dropout: 4.5, literacy: 93 },
  
  // Kerala NSP Data
  { state: 'Kerala', scheme: 'NSP 2.0', year: '2024', gender: 'female', locality: 'rural', beneficiaries: 38000, budget: 760, utilization: 98, enrollment: 39000, dropout: 2.1, literacy: 96 },
  { state: 'Kerala', scheme: 'NSP 2.0', year: '2024', gender: 'female', locality: 'urban', beneficiaries: 42000, budget: 840, utilization: 97, enrollment: 43000, dropout: 1.8, literacy: 97 },
  
  // PMKVY Data across states
  { state: 'Punjab', scheme: 'PMKVY 4.0', year: '2024', gender: 'female', locality: 'rural', beneficiaries: 28000, budget: 420, utilization: 96, enrollment: 30000 },
  { state: 'Punjab', scheme: 'PMKVY 4.0', year: '2024', gender: 'male', locality: 'rural', beneficiaries: 32000, budget: 480, utilization: 95, enrollment: 34000 },
  { state: 'Delhi', scheme: 'PMKVY 4.0', year: '2024', gender: 'female', locality: 'urban', beneficiaries: 45000, budget: 675, utilization: 94, enrollment: 48000 },
  { state: 'Kerala', scheme: 'PMKVY 4.0', year: '2024', gender: 'female', locality: 'rural', beneficiaries: 22000, budget: 330, utilization: 97, enrollment: 23000 },
  
  // Maharashtra NSP Data
  { state: 'Maharashtra', scheme: 'NSP 2.0', year: '2024', gender: 'female', locality: 'rural', beneficiaries: 85000, budget: 1700, utilization: 91, enrollment: 95000, dropout: 7.5, literacy: 82 },
  { state: 'Maharashtra', scheme: 'NSP 2.0', year: '2024', gender: 'male', locality: 'rural', beneficiaries: 78000, budget: 1560, utilization: 89, enrollment: 88000, dropout: 7.8, literacy: 85 },
  
  // Bihar NSP Data
  { state: 'Bihar', scheme: 'NSP 2.0', year: '2024', gender: 'female', locality: 'rural', beneficiaries: 95000, budget: 1900, utilization: 82, enrollment: 120000, dropout: 15.2, literacy: 68 },
  { state: 'Bihar', scheme: 'NSP 2.0', year: '2024', gender: 'male', locality: 'rural', beneficiaries: 88000, budget: 1760, utilization: 80, enrollment: 115000, dropout: 14.8, literacy: 72 },
  
  // PM-YASASVI Data
  { state: 'Punjab', scheme: 'PM-YASASVI', year: '2024', gender: 'all', locality: 'all', beneficiaries: 15000, budget: 300, utilization: 92, enrollment: 16000 },
  { state: 'Delhi', scheme: 'PM-YASASVI', year: '2024', gender: 'all', locality: 'all', beneficiaries: 12000, budget: 240, utilization: 95, enrollment: 12500 },
  { state: 'Maharashtra', scheme: 'PM-YASASVI', year: '2024', gender: 'all', locality: 'all', beneficiaries: 25000, budget: 500, utilization: 90, enrollment: 28000 },
  { state: 'Kerala', scheme: 'PM-YASASVI', year: '2024', gender: 'all', locality: 'all', beneficiaries: 8000, budget: 160, utilization: 98, enrollment: 8200 },
  { state: 'Bihar', scheme: 'PM-YASASVI', year: '2024', gender: 'all', locality: 'all', beneficiaries: 35000, budget: 700, utilization: 78, enrollment: 45000 },
];

// Query parser to extract filters from natural language
export function parseQuery(query: string): {
  state?: string;
  scheme?: string;
  year?: string;
  gender?: 'male' | 'female';
  locality?: 'rural' | 'urban';
  confidence: number;
} {
  const lowercaseQuery = query.toLowerCase();
  
  const states = ['punjab', 'delhi', 'kerala', 'maharashtra', 'bihar', 'tamil nadu', 'karnataka'];
  const schemes = {
    'nsp': 'NSP 2.0',
    'national scholarship': 'NSP 2.0',
    'pmkvy': 'PMKVY 4.0',
    'skill': 'PMKVY 4.0',
    'yasasvi': 'PM-YASASVI',
    'midday': 'Mid-Day Meal',
    'mid-day': 'Mid-Day Meal',
  };
  
  const result: any = { confidence: 0 };
  let matches = 0;
  
  // Extract state
  for (const state of states) {
    if (lowercaseQuery.includes(state)) {
      result.state = state.charAt(0).toUpperCase() + state.slice(1);
      matches++;
      break;
    }
  }
  
  // Extract scheme
  for (const [keyword, schemeName] of Object.entries(schemes)) {
    if (lowercaseQuery.includes(keyword)) {
      result.scheme = schemeName;
      matches++;
      break;
    }
  }
  
  // Extract year
  const yearMatch = lowercaseQuery.match(/20(20|21|22|23|24)/);
  if (yearMatch) {
    result.year = yearMatch[0];
    matches++;
  }
  
  // Extract gender
  if (lowercaseQuery.includes('female') || lowercaseQuery.includes('girl') || lowercaseQuery.includes('women')) {
    result.gender = 'female';
    matches++;
  } else if (lowercaseQuery.includes('male') || lowercaseQuery.includes('boy') || lowercaseQuery.includes('men')) {
    result.gender = 'male';
    matches++;
  }
  
  // Extract locality
  if (lowercaseQuery.includes('rural') || lowercaseQuery.includes('village')) {
    result.locality = 'rural';
    matches++;
  } else if (lowercaseQuery.includes('urban') || lowercaseQuery.includes('city')) {
    result.locality = 'urban';
    matches++;
  }
  
  // Calculate confidence based on matches
  const totalPossible = 5;
  result.confidence = matches > 0 ? Math.round((matches / totalPossible) * 100) : 0;
  
  return result;
}

// Normalize filter values to match dataset canonical labels
export function normalizeFilters(filters: {
  state?: string;
  scheme?: string;
  year?: string;
  gender?: 'male' | 'female';
  locality?: 'rural' | 'urban';
}): typeof filters {
  const normalized: any = {};
  
  // Normalize state (capitalize first letter)
  if (filters.state && filters.state !== 'all') {
    normalized.state = filters.state.charAt(0).toUpperCase() + filters.state.slice(1).toLowerCase();
  }
  
  // Normalize scheme (map UI values to canonical names)
  if (filters.scheme && filters.scheme !== 'all') {
    const schemeMap: { [key: string]: string } = {
      'nsp': 'NSP 2.0',
      'nsp 2.0': 'NSP 2.0',
      'pmkvy': 'PMKVY 4.0',
      'pmkvy 4.0': 'PMKVY 4.0',
      'yasasvi': 'PM-YASASVI',
      'pm-yasasvi': 'PM-YASASVI',
      'midday': 'Mid-Day Meal',
      'mid-day meal': 'Mid-Day Meal',
    };
    normalized.scheme = schemeMap[filters.scheme.toLowerCase()] || filters.scheme;
  }
  
  // Normalize year
  if (filters.year && filters.year !== 'all') {
    normalized.year = filters.year;
  }
  
  // Normalize gender and locality (pass through if set)
  if (filters.gender) normalized.gender = filters.gender;
  if (filters.locality) normalized.locality = filters.locality;
  
  return normalized;
}

// Filter and aggregate data based on criteria
export function filterData(filters: {
  state?: string;
  scheme?: string;
  year?: string;
  gender?: 'male' | 'female';
  locality?: 'rural' | 'urban';
}): PolicyDataPoint[] {
  // Normalize filters to match dataset
  const normalizedFilters = normalizeFilters(filters);
  
  return policyDatabase.filter(record => {
    if (normalizedFilters.state && record.state !== normalizedFilters.state) return false;
    if (normalizedFilters.scheme && record.scheme !== normalizedFilters.scheme) return false;
    if (normalizedFilters.year && record.year !== normalizedFilters.year) return false;
    if (normalizedFilters.gender && record.gender !== 'all' && record.gender !== normalizedFilters.gender) return false;
    if (normalizedFilters.locality && record.locality !== 'all' && record.locality !== normalizedFilters.locality) return false;
    return true;
  });
}

// Aggregate results
export function aggregateData(data: PolicyDataPoint[]): {
  totalBeneficiaries: number;
  totalBudget: number;
  avgUtilization: number;
  avgEnrollment: number;
  avgDropout: number;
  avgLiteracy: number;
} {
  if (data.length === 0) return {
    totalBeneficiaries: 0,
    totalBudget: 0,
    avgUtilization: 0,
    avgEnrollment: 0,
    avgDropout: 0,
    avgLiteracy: 0,
  };
  
  const result = data.reduce((acc, record) => ({
    totalBeneficiaries: acc.totalBeneficiaries + record.beneficiaries,
    totalBudget: acc.totalBudget + record.budget,
    totalUtilization: acc.totalUtilization + record.utilization,
    totalEnrollment: acc.totalEnrollment + (record.enrollment || 0),
    totalDropout: acc.totalDropout + (record.dropout || 0),
    totalLiteracy: acc.totalLiteracy + (record.literacy || 0),
    countUtilization: acc.countUtilization + 1,
    countEnrollment: acc.countEnrollment + (record.enrollment ? 1 : 0),
    countDropout: acc.countDropout + (record.dropout ? 1 : 0),
    countLiteracy: acc.countLiteracy + (record.literacy ? 1 : 0),
  }), {
    totalBeneficiaries: 0,
    totalBudget: 0,
    totalUtilization: 0,
    totalEnrollment: 0,
    totalDropout: 0,
    totalLiteracy: 0,
    countUtilization: 0,
    countEnrollment: 0,
    countDropout: 0,
    countLiteracy: 0,
  });
  
  return {
    totalBeneficiaries: result.totalBeneficiaries,
    totalBudget: result.totalBudget,
    avgUtilization: Math.round(result.totalUtilization / result.countUtilization),
    avgEnrollment: Math.round(result.totalEnrollment / (result.countEnrollment || 1)),
    avgDropout: Math.round((result.totalDropout / (result.countDropout || 1)) * 10) / 10,
    avgLiteracy: Math.round(result.totalLiteracy / (result.countLiteracy || 1)),
  };
}

// Generate AI insights from filtered data
export function generateInsights(
  data: PolicyDataPoint[],
  filters: any
): string[] {
  const insights: string[] = [];
  
  if (data.length === 0) {
    insights.push("No data available for the selected criteria.");
    return insights;
  }
  
  const aggregated = aggregateData(data);
  
  // Insight 1: Beneficiaries summary
  if (filters.state && filters.scheme && filters.gender && filters.locality) {
    insights.push(
      `🎯 ${filters.state} - ${filters.scheme}: ${aggregated.totalBeneficiaries.toLocaleString()} ${filters.gender} students from ${filters.locality} areas benefited, with ₹${aggregated.totalBudget}Cr budget allocation (${aggregated.avgUtilization}% utilized).`
    );
  } else if (filters.scheme) {
    insights.push(
      `📊 ${filters.scheme} Impact: Total of ${aggregated.totalBeneficiaries.toLocaleString()} beneficiaries across selected regions with ${aggregated.avgUtilization}% average budget utilization.`
    );
  }
  
  // Insight 2: Performance analysis
  if (aggregated.avgUtilization >= 90) {
    insights.push(
      `✅ Excellent Implementation: Budget utilization of ${aggregated.avgUtilization}% indicates strong on-ground execution and efficient resource deployment.`
    );
  } else if (aggregated.avgUtilization < 80) {
    insights.push(
      `⚠️ Utilization Alert: Budget utilization at ${aggregated.avgUtilization}% suggests implementation challenges. Recommend reviewing operational bottlenecks.`
    );
  }
  
  // Insight 3: Literacy/Dropout analysis
  if (aggregated.avgLiteracy > 0) {
    if (aggregated.avgLiteracy >= 85) {
      insights.push(
        `📈 High Literacy Achievement: Average literacy rate of ${aggregated.avgLiteracy}% demonstrates successful policy impact on educational outcomes.`
      );
    } else if (aggregated.avgLiteracy < 75) {
      insights.push(
        `🎯 Growth Opportunity: Literacy rate at ${aggregated.avgLiteracy}% indicates potential for targeted interventions to improve outcomes.`
      );
    }
  }
  
  return insights;
}
