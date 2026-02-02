import { Sector, HierarchyNode } from '@/types';

// Complete hierarchy: Sector > Industry > SubIndustry > Keywords
export const sectorHierarchy: HierarchyNode[] = [
  {
    sector: 'Retail',
    industries: [
      {
        name: 'Apparel & Accessories',
        subIndustries: [
          { name: 'Clothing Stores', keywords: ['clothing store', 'mens clothing', 'womens clothing', 'fashion boutique', 'apparel store'] },
          { name: 'Shoe Stores', keywords: ['shoe store', 'footwear', 'sneaker store', 'boot store', 'athletic shoes'] },
          { name: 'Jewelry & Watches', keywords: ['jewelry store', 'watch store', 'diamond rings', 'gold jewelry', 'engagement rings'] },
        ],
      },
      {
        name: 'Electronics & Appliances',
        subIndustries: [
          { name: 'Consumer Electronics', keywords: ['electronics store', 'tv store', 'computer store', 'phone store', 'audio equipment'] },
          { name: 'Home Appliances', keywords: ['appliance store', 'washer dryer', 'refrigerator store', 'kitchen appliances', 'vacuum store'] },
        ],
      },
      {
        name: 'Home & Garden',
        subIndustries: [
          { name: 'Furniture Stores', keywords: ['furniture store', 'sofa store', 'mattress store', 'bedroom furniture', 'office furniture'] },
          { name: 'Home Improvement', keywords: ['hardware store', 'home depot', 'lowes', 'lumber yard', 'building supplies'] },
          { name: 'Garden Centers', keywords: ['garden center', 'nursery plants', 'landscaping supplies', 'lawn care', 'outdoor plants'] },
        ],
      },
      {
        name: 'Grocery & Supermarkets',
        subIndustries: [
          { name: 'Supermarkets', keywords: ['grocery store', 'supermarket', 'food market', 'grocery delivery', 'organic grocery'] },
          { name: 'Specialty Food', keywords: ['butcher shop', 'fish market', 'bakery', 'cheese shop', 'wine shop'] },
          { name: 'Convenience Stores', keywords: ['convenience store', 'corner store', '24 hour store', 'gas station food', 'mini mart'] },
        ],
      },
      {
        name: 'Automotive Retail',
        subIndustries: [
          { name: 'Auto Parts', keywords: ['auto parts store', 'car parts', 'autozone', 'oreilly auto', 'advance auto'] },
          { name: 'Tire Shops', keywords: ['tire shop', 'tire store', 'discount tires', 'tire installation', 'wheel alignment'] },
        ],
      },
    ],
  },
  {
    sector: 'Finance',
    industries: [
      {
        name: 'Banking',
        subIndustries: [
          { name: 'Retail Banking', keywords: ['bank near me', 'checking account', 'savings account', 'bank branch', 'atm near me'] },
          { name: 'Credit Unions', keywords: ['credit union', 'credit union near me', 'member credit union', 'local credit union', 'federal credit union'] },
          { name: 'Commercial Banking', keywords: ['business banking', 'commercial loans', 'business checking', 'merchant services', 'business credit'] },
        ],
      },
      {
        name: 'Insurance',
        subIndustries: [
          { name: 'Auto Insurance', keywords: ['car insurance', 'auto insurance quote', 'vehicle insurance', 'liability insurance', 'full coverage auto'] },
          { name: 'Home Insurance', keywords: ['homeowners insurance', 'home insurance quote', 'property insurance', 'renters insurance', 'condo insurance'] },
          { name: 'Life Insurance', keywords: ['life insurance', 'term life insurance', 'whole life insurance', 'life insurance agent', 'insurance broker'] },
          { name: 'Health Insurance', keywords: ['health insurance', 'medical insurance', 'health insurance agent', 'affordable care act', 'medicare agent'] },
        ],
      },
      {
        name: 'Financial Services',
        subIndustries: [
          { name: 'Financial Advisors', keywords: ['financial advisor', 'wealth management', 'investment advisor', 'financial planner', 'retirement planning'] },
          { name: 'Tax Services', keywords: ['tax preparer', 'tax accountant', 'cpa near me', 'tax preparation', 'h&r block'] },
          { name: 'Mortgage & Lending', keywords: ['mortgage lender', 'home loan', 'refinance mortgage', 'mortgage broker', 'fha loan'] },
        ],
      },
    ],
  },
  {
    sector: 'Business Services',
    industries: [
      {
        name: 'Professional Services',
        subIndustries: [
          { name: 'Legal Services', keywords: ['lawyer near me', 'attorney', 'law firm', 'personal injury lawyer', 'divorce attorney'] },
          { name: 'Accounting', keywords: ['accountant', 'bookkeeper', 'cpa firm', 'accounting services', 'payroll services'] },
          { name: 'Consulting', keywords: ['business consultant', 'management consulting', 'hr consultant', 'it consultant', 'marketing consultant'] },
        ],
      },
      {
        name: 'Marketing & Advertising',
        subIndustries: [
          { name: 'Advertising Agencies', keywords: ['advertising agency', 'ad agency', 'marketing agency', 'creative agency', 'digital agency'] },
          { name: 'Print & Signs', keywords: ['print shop', 'sign company', 'banner printing', 'business cards', 'promotional products'] },
        ],
      },
      {
        name: 'IT & Technology',
        subIndustries: [
          { name: 'IT Support', keywords: ['it support', 'computer repair', 'tech support', 'managed it services', 'network support'] },
          { name: 'Software Services', keywords: ['software development', 'web development', 'app development', 'custom software', 'saas provider'] },
        ],
      },
      {
        name: 'Staffing & HR',
        subIndustries: [
          { name: 'Staffing Agencies', keywords: ['staffing agency', 'temp agency', 'employment agency', 'recruiting firm', 'headhunter'] },
          { name: 'HR Services', keywords: ['hr services', 'peo services', 'hr outsourcing', 'employee benefits', 'hr consulting'] },
        ],
      },
    ],
  },
  {
    sector: 'Food & Beverage',
    industries: [
      {
        name: 'Restaurants',
        subIndustries: [
          { name: 'Fast Food', keywords: ['fast food', 'drive thru', 'burger joint', 'quick service restaurant', 'fast casual'] },
          { name: 'Casual Dining', keywords: ['restaurant near me', 'family restaurant', 'casual dining', 'american restaurant', 'diner'] },
          { name: 'Fine Dining', keywords: ['fine dining', 'upscale restaurant', 'gourmet restaurant', 'steakhouse', 'french restaurant'] },
          { name: 'Ethnic Cuisine', keywords: ['mexican restaurant', 'chinese restaurant', 'italian restaurant', 'thai food', 'indian restaurant'] },
        ],
      },
      {
        name: 'Quick Service',
        subIndustries: [
          { name: 'Pizza', keywords: ['pizza delivery', 'pizza near me', 'pizzeria', 'pizza restaurant', 'best pizza'] },
          { name: 'Sandwiches & Subs', keywords: ['sandwich shop', 'sub shop', 'deli near me', 'hoagie shop', 'panini'] },
          { name: 'Chicken', keywords: ['fried chicken', 'chicken restaurant', 'chicken wings', 'rotisserie chicken', 'chicken tenders'] },
        ],
      },
      {
        name: 'Cafes & Coffee',
        subIndustries: [
          { name: 'Coffee Shops', keywords: ['coffee shop', 'cafe near me', 'espresso bar', 'coffee house', 'local coffee'] },
          { name: 'Bakeries', keywords: ['bakery near me', 'donut shop', 'pastry shop', 'cupcake shop', 'bread bakery'] },
          { name: 'Juice & Smoothies', keywords: ['smoothie shop', 'juice bar', 'acai bowl', 'fresh juice', 'protein shake'] },
        ],
      },
      {
        name: 'Bars & Nightlife',
        subIndustries: [
          { name: 'Bars & Pubs', keywords: ['bar near me', 'sports bar', 'pub', 'beer bar', 'cocktail bar'] },
          { name: 'Breweries & Wineries', keywords: ['brewery', 'craft beer', 'winery', 'wine tasting', 'distillery'] },
        ],
      },
    ],
  },
  {
    sector: 'Healthcare',
    industries: [
      {
        name: 'Medical Practices',
        subIndustries: [
          { name: 'Primary Care', keywords: ['doctor near me', 'family doctor', 'primary care physician', 'general practitioner', 'internal medicine'] },
          { name: 'Pediatrics', keywords: ['pediatrician', 'childrens doctor', 'kids doctor', 'pediatric clinic', 'baby doctor'] },
          { name: 'OB/GYN', keywords: ['obgyn', 'gynecologist', 'womens health', 'prenatal care', 'fertility doctor'] },
        ],
      },
      {
        name: 'Specialists',
        subIndustries: [
          { name: 'Cardiology', keywords: ['cardiologist', 'heart doctor', 'cardiac care', 'heart specialist', 'cardiovascular'] },
          { name: 'Orthopedics', keywords: ['orthopedic doctor', 'bone doctor', 'sports medicine', 'joint specialist', 'spine doctor'] },
          { name: 'Dermatology', keywords: ['dermatologist', 'skin doctor', 'acne treatment', 'skin care clinic', 'mole removal'] },
          { name: 'Ophthalmology', keywords: ['eye doctor', 'ophthalmologist', 'lasik', 'cataract surgery', 'vision center'] },
        ],
      },
      {
        name: 'Dental',
        subIndustries: [
          { name: 'General Dentistry', keywords: ['dentist near me', 'dental office', 'teeth cleaning', 'dental checkup', 'family dentist'] },
          { name: 'Orthodontics', keywords: ['orthodontist', 'braces', 'invisalign', 'teeth straightening', 'retainer'] },
          { name: 'Oral Surgery', keywords: ['oral surgeon', 'wisdom teeth removal', 'dental implants', 'tooth extraction', 'jaw surgery'] },
        ],
      },
      {
        name: 'Urgent & Emergency',
        subIndustries: [
          { name: 'Urgent Care', keywords: ['urgent care', 'walk in clinic', 'immediate care', 'after hours clinic', 'minute clinic'] },
          { name: 'Emergency Rooms', keywords: ['emergency room', 'er near me', 'hospital emergency', '24 hour emergency', 'trauma center'] },
        ],
      },
      {
        name: 'Pharmacy',
        subIndustries: [
          { name: 'Retail Pharmacy', keywords: ['pharmacy near me', 'drugstore', 'cvs pharmacy', 'walgreens', 'prescription pickup'] },
          { name: 'Specialty Pharmacy', keywords: ['compounding pharmacy', 'specialty pharmacy', 'mail order pharmacy', 'online pharmacy'] },
        ],
      },
    ],
  },
  {
    sector: 'Hospitality',
    industries: [
      {
        name: 'Lodging',
        subIndustries: [
          { name: 'Hotels', keywords: ['hotel near me', 'hotels', 'book hotel', 'hotel reservation', 'best hotel'] },
          { name: 'Motels', keywords: ['motel', 'budget motel', 'roadside motel', 'cheap motel', 'motel near me'] },
          { name: 'Resorts', keywords: ['resort', 'beach resort', 'spa resort', 'golf resort', 'all inclusive'] },
          { name: 'Vacation Rentals', keywords: ['vacation rental', 'airbnb', 'vrbo', 'cabin rental', 'beach house rental'] },
        ],
      },
      {
        name: 'Travel & Tourism',
        subIndustries: [
          { name: 'Travel Agencies', keywords: ['travel agent', 'travel agency', 'vacation packages', 'cruise deals', 'flight booking'] },
          { name: 'Tours & Activities', keywords: ['tours near me', 'sightseeing tours', 'guided tours', 'excursions', 'local tours'] },
        ],
      },
      {
        name: 'Events & Venues',
        subIndustries: [
          { name: 'Event Venues', keywords: ['event venue', 'wedding venue', 'banquet hall', 'conference center', 'party venue'] },
          { name: 'Catering', keywords: ['catering', 'event catering', 'wedding catering', 'corporate catering', 'food catering'] },
        ],
      },
    ],
  },
  {
    sector: 'Organizations',
    industries: [
      {
        name: 'Education',
        subIndustries: [
          { name: 'K-12 Schools', keywords: ['school near me', 'elementary school', 'middle school', 'high school', 'private school'] },
          { name: 'Higher Education', keywords: ['college', 'university', 'community college', 'graduate school', 'online degree'] },
          { name: 'Tutoring & Test Prep', keywords: ['tutoring', 'sat prep', 'math tutor', 'learning center', 'kumon'] },
        ],
      },
      {
        name: 'Religious',
        subIndustries: [
          { name: 'Churches', keywords: ['church near me', 'baptist church', 'catholic church', 'methodist church', 'non denominational church'] },
          { name: 'Other Houses of Worship', keywords: ['synagogue', 'mosque', 'temple', 'buddhist temple', 'hindu temple'] },
        ],
      },
      {
        name: 'Government',
        subIndustries: [
          { name: 'Local Government', keywords: ['city hall', 'county office', 'dmv', 'post office', 'town hall'] },
          { name: 'Public Services', keywords: ['library', 'community center', 'parks and recreation', 'public pool', 'senior center'] },
        ],
      },
      {
        name: 'Nonprofits',
        subIndustries: [
          { name: 'Charities', keywords: ['charity', 'food bank', 'homeless shelter', 'donation center', 'goodwill'] },
          { name: 'Community Organizations', keywords: ['ymca', 'boys and girls club', 'rotary club', 'lions club', 'community foundation'] },
        ],
      },
    ],
  },
];

// Helper functions to get lists at each level
export function getIndustriesForSector(sector: Sector): string[] {
  const node = sectorHierarchy.find(h => h.sector === sector);
  return node ? node.industries.map(i => i.name) : [];
}

export function getSubIndustriesForIndustry(sector: Sector, industry: string): string[] {
  const node = sectorHierarchy.find(h => h.sector === sector);
  if (!node) return [];
  const ind = node.industries.find(i => i.name === industry);
  return ind ? ind.subIndustries.map(s => s.name) : [];
}

export function getKeywordsForSubIndustry(sector: Sector, industry: string, subIndustry: string): string[] {
  const node = sectorHierarchy.find(h => h.sector === sector);
  if (!node) return [];
  const ind = node.industries.find(i => i.name === industry);
  if (!ind) return [];
  const sub = ind.subIndustries.find(s => s.name === subIndustry);
  return sub ? sub.keywords : [];
}

// Get all industries across all sectors
export function getAllIndustries(): { name: string; sector: Sector }[] {
  const industries: { name: string; sector: Sector }[] = [];
  sectorHierarchy.forEach(node => {
    node.industries.forEach(ind => {
      industries.push({ name: ind.name, sector: node.sector });
    });
  });
  return industries;
}

// Get all sub-industries for given industries
export function getAllSubIndustries(industries?: string[]): { name: string; industry: string; sector: Sector }[] {
  const subIndustries: { name: string; industry: string; sector: Sector }[] = [];
  sectorHierarchy.forEach(node => {
    node.industries.forEach(ind => {
      if (!industries || industries.length === 0 || industries.includes(ind.name)) {
        ind.subIndustries.forEach(sub => {
          subIndustries.push({ name: sub.name, industry: ind.name, sector: node.sector });
        });
      }
    });
  });
  return subIndustries;
}

// Get all keywords
export function getAllKeywords(subIndustries?: string[]): { name: string; subIndustry: string; industry: string; sector: Sector }[] {
  const keywords: { name: string; subIndustry: string; industry: string; sector: Sector }[] = [];
  sectorHierarchy.forEach(node => {
    node.industries.forEach(ind => {
      ind.subIndustries.forEach(sub => {
        if (!subIndustries || subIndustries.length === 0 || subIndustries.includes(sub.name)) {
          sub.keywords.forEach(kw => {
            keywords.push({ name: kw, subIndustry: sub.name, industry: ind.name, sector: node.sector });
          });
        }
      });
    });
  });
  return keywords;
}
