// import React, { useState } from 'react';
// import { MapPin, TrendingUp, DollarSign, Users, Loader2 } from 'lucide-react';

// export default function MarketAdvisor() {
//   const [businessInfo, setBusinessInfo] = useState({
//     name: '',
//     industry: '',
//     currentLocation: '',
//     budget: '',
//     expansionType: 'both'
//   });
//   const [analysis, setAnalysis] = useState(null);
//   const [loading, setLoading] = useState(false);

//   const indianCities = [
//     "Mumbai", "Delhi", "Bangalore", "Hyderabad", "Chennai", "Kolkata", 
//     "Pune", "Ahmedabad", "Surat", "Jaipur", "Lucknow", "Kanpur", 
//     "Nagpur", "Indore", "Bhopal", "Visakhapatnam", "Vadodara", "Coimbatore",
//     "Kochi", "Chandigarh", "Gurgaon", "Noida", "Ghaziabad", "Mysore"
//   ];

//   const industries = [
//     "E-commerce", "SaaS/Technology", "Retail", "Food & Beverage", 
//     "Healthcare", "Education/EdTech", "Manufacturing", "Logistics", 
//     "Real Estate", "Fashion/Apparel", "FMCG", "Fintech"
//   ];

//   const handleSubmit = async () => {
//     if (!businessInfo.name || !businessInfo.industry || !businessInfo.currentLocation || !businessInfo.budget) {
//       return;
//     }

//     setLoading(true);
//     setAnalysis(null);

//     try {
//       const response = await fetch("https://api.anthropic.com/v1/messages", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           model: "claude-sonnet-4-20250514",
//           max_tokens: 1500,
//           messages: [
//             {
//               role: "user",
//               content: `You are a market expansion advisor specializing in the Indian market. Analyze the following business and provide expansion recommendations specifically for India in JSON format.

// Business Details:
// - Name: ${businessInfo.name}
// - Industry: ${businessInfo.industry}
// - Current Location: ${businessInfo.currentLocation}
// - Expansion Budget: ${businessInfo.budget}
// - Expansion Type Preference: ${businessInfo.expansionType === 'both' ? 'Online and Offline' : businessInfo.expansionType === 'online' ? 'Online Only' : 'Offline Only'}

// Consider Indian market factors like:
// - Tier 1, Tier 2, and Tier 3 city dynamics
// - Regional preferences and cultural considerations
// - Digital infrastructure and internet penetration
// - Local competition and market saturation
// - GST and regulatory considerations
// - Logistics networks (railways, highways, delivery partners)
// - Cost of operations in different states
// - Consumer spending power and demographics

// Provide a response ONLY in this JSON format with no additional text or markdown:
// {
//   "topCities": [
//     {
//       "name": "City Name",
//       "state": "State Name",
//       "tier": "Tier 1/2/3",
//       "demandScore": 85,
//       "reason": "Specific reason for this Indian city"
//     }
//   ],
//   "marketAnalysis": {
//     "demandTrend": "Analysis of demand trends in India for this industry",
//     "competition": "Competition level in target Indian markets",
//     "logisticsCost": "Logistics cost estimation considering Indian infrastructure, delivery partners like Delhivery, BlueDart, etc.",
//     "regulatoryConsiderations": "GST, state regulations, and compliance requirements"
//   },
//   "expansionStrategy": {
//     "recommended": "online/offline/hybrid",
//     "reasoning": "Why this strategy works for the Indian market",
//     "timeline": "Suggested timeline considering Indian market conditions",
//     "localPartners": "Suggested types of local partnerships or platforms (e.g., Swiggy, Zomato, Flipkart, Amazon India)"
//   },
//   "keyInsights": [
//     "India-specific insight 1",
//     "India-specific insight 2",
//     "India-specific insight 3",
//     "India-specific insight 4"
//   ],
//   "budgetBreakdown": {
//     "setup": "Estimated setup costs in INR",
//     "operations": "Monthly operational costs in INR",
//     "marketing": "Marketing budget recommendations in INR"
//   }
// }`
//             }
//           ]
//         })
//       });

//       const data = await response.json();
//       const content = data.content[0].text;
      
//       // Remove any markdown code blocks if present
//       const cleanContent = content.replace(/```json|```/g, '').trim();
//       const parsedAnalysis = JSON.parse(cleanContent);
      
//       setAnalysis(parsedAnalysis);
//     } catch (error) {
//       console.error('Error:', error);
//       setAnalysis({
//         error: 'Failed to generate analysis. Please try again.'
//       });
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-orange-50 to-green-100 p-6">
//       <div className="max-w-6xl mx-auto">
//         <div className="text-center mb-8">
//           <h1 className="text-4xl font-bold text-gray-800 mb-2 flex items-center justify-center gap-2">
//             <MapPin className="w-10 h-10 text-orange-600" />
//             AI Market Expansion Advisor
//           </h1>
//           <p className="text-gray-600">Get data-driven insights for expanding your business across India 🇮🇳</p>
//         </div>

//         <div className="grid md:grid-cols-2 gap-6">
//           {/* Input Form */}
//           <div className="bg-white rounded-lg shadow-lg p-6">
//             <h2 className="text-2xl font-semibold mb-4 text-gray-800">Business Information</h2>
//             <div className="space-y-4">
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   Business Name
//                 </label>
//                 <input
//                   type="text"
//                   value={businessInfo.name}
//                   onChange={(e) => setBusinessInfo({...businessInfo, name: e.target.value})}
//                   className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
//                   placeholder="e.g., QuickBite Foods"
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   Industry
//                 </label>
//                 <select
//                   value={businessInfo.industry}
//                   onChange={(e) => setBusinessInfo({...businessInfo, industry: e.target.value})}
//                   className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
//                 >
//                   <option value="">Select Industry</option>
//                   {industries.map((industry) => (
//                     <option key={industry} value={industry}>{industry}</option>
//                   ))}
//                 </select>
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   Current Location (City)
//                 </label>
//                 <select
//                   value={businessInfo.currentLocation}
//                   onChange={(e) => setBusinessInfo({...businessInfo, currentLocation: e.target.value})}
//                   className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
//                 >
//                   <option value="">Select City</option>
//                   {indianCities.map((city) => (
//                     <option key={city} value={city}>{city}</option>
//                   ))}
//                 </select>
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   Expansion Budget (₹)
//                 </label>
//                 <select
//                   value={businessInfo.budget}
//                   onChange={(e) => setBusinessInfo({...businessInfo, budget: e.target.value})}
//                   className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
//                 >
//                   <option value="">Select Budget Range</option>
//                   <option value="₹10L - ₹25L">₹10L - ₹25L</option>
//                   <option value="₹25L - ₹50L">₹25L - ₹50L</option>
//                   <option value="₹50L - ₹1Cr">₹50L - ₹1Cr</option>
//                   <option value="₹1Cr - ₹2Cr">₹1Cr - ₹2Cr</option>
//                   <option value="₹2Cr - ₹5Cr">₹2Cr - ₹5Cr</option>
//                   <option value="₹5Cr+">₹5Cr+</option>
//                 </select>
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   Expansion Type
//                 </label>
//                 <select
//                   value={businessInfo.expansionType}
//                   onChange={(e) => setBusinessInfo({...businessInfo, expansionType: e.target.value})}
//                   className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
//                 >
//                   <option value="both">Online & Offline (Hybrid)</option>
//                   <option value="online">Online Only (E-commerce/Digital)</option>
//                   <option value="offline">Offline Only (Physical Stores)</option>
//                 </select>
//               </div>

//               <button
//                 onClick={handleSubmit}
//                 disabled={loading}
//                 className="w-full bg-gradient-to-r from-orange-500 to-orange-600 text-white py-3 rounded-lg font-semibold hover:from-orange-600 hover:to-orange-700 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
//               >
//                 {loading ? (
//                   <>
//                     <Loader2 className="w-5 h-5 animate-spin" />
//                     Analyzing Market...
//                   </>
//                 ) : (
//                   'Get Expansion Insights'
//                 )}
//               </button>
//             </div>
//           </div>

//           {/* Results Panel */}
//           <div className="bg-white rounded-lg shadow-lg p-6 max-h-[650px] overflow-y-auto">
//             <h2 className="text-2xl font-semibold mb-4 text-gray-800">Analysis Results</h2>
            
//             {!analysis && !loading && (
//               <div className="text-center text-gray-500 py-12">
//                 <MapPin className="w-16 h-16 mx-auto mb-4 text-gray-300" />
//                 <p>Fill out the form to get your India-specific expansion analysis</p>
//               </div>
//             )}

//             {analysis && !analysis.error && (
//               <div className="space-y-6">
//                 {/* Top Cities */}
//                 <div>
//                   <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center gap-2">
//                     <MapPin className="w-5 h-5 text-orange-600" />
//                     Recommended Cities
//                   </h3>
//                   <div className="space-y-3">
//                     {analysis.topCities.map((city, idx) => (
//                       <div key={idx} className="bg-orange-50 p-4 rounded-lg border border-orange-200">
//                         <div className="flex justify-between items-start mb-2">
//                           <div>
//                             <h4 className="font-semibold text-gray-800">{city.name}, {city.state}</h4>
//                             <span className="text-xs text-gray-600">{city.tier}</span>
//                           </div>
//                           <span className="bg-orange-600 text-white px-2 py-1 rounded text-sm">
//                             Score: {city.demandScore}
//                           </span>
//                         </div>
//                         <p className="text-sm text-gray-600">{city.reason}</p>
//                       </div>
//                     ))}
//                   </div>
//                 </div>

//                 {/* Market Analysis */}
//                 <div>
//                   <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center gap-2">
//                     <TrendingUp className="w-5 h-5 text-green-600" />
//                     Market Analysis
//                   </h3>
//                   <div className="space-y-3">
//                     <div className="bg-gray-50 p-3 rounded-lg">
//                       <p className="text-sm font-medium text-gray-700 mb-1">Demand Trend</p>
//                       <p className="text-sm text-gray-600">{analysis.marketAnalysis.demandTrend}</p>
//                     </div>
//                     <div className="bg-gray-50 p-3 rounded-lg">
//                       <p className="text-sm font-medium text-gray-700 mb-1">Competition</p>
//                       <p className="text-sm text-gray-600">{analysis.marketAnalysis.competition}</p>
//                     </div>
//                     <div className="bg-gray-50 p-3 rounded-lg">
//                       <p className="text-sm font-medium text-gray-700 mb-1">Logistics Cost</p>
//                       <p className="text-sm text-gray-600">{analysis.marketAnalysis.logisticsCost}</p>
//                     </div>
//                     <div className="bg-gray-50 p-3 rounded-lg">
//                       <p className="text-sm font-medium text-gray-700 mb-1">Regulatory Considerations</p>
//                       <p className="text-sm text-gray-600">{analysis.marketAnalysis.regulatoryConsiderations}</p>
//                     </div>
//                   </div>
//                 </div>

//                 {/* Expansion Strategy */}
//                 <div>
//                   <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center gap-2">
//                     <Users className="w-5 h-5 text-blue-600" />
//                     Recommended Strategy
//                   </h3>
//                   <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
//                     <p className="font-semibold text-gray-800 mb-2 capitalize">
//                       {analysis.expansionStrategy.recommended} Expansion
//                     </p>
//                     <p className="text-sm text-gray-600 mb-2">{analysis.expansionStrategy.reasoning}</p>
//                     <p className="text-sm text-gray-500 mb-2">Timeline: {analysis.expansionStrategy.timeline}</p>
//                     <p className="text-sm text-blue-700 font-medium">Local Partners: {analysis.expansionStrategy.localPartners}</p>
//                   </div>
//                 </div>

//                 {/* Budget Breakdown */}
//                 {analysis.budgetBreakdown && (
//                   <div>
//                     <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center gap-2">
//                       <DollarSign className="w-5 h-5 text-green-600" />
//                       Budget Breakdown
//                     </h3>
//                     <div className="bg-green-50 p-4 rounded-lg border border-green-200 space-y-2">
//                       <div className="flex justify-between">
//                         <span className="text-sm font-medium text-gray-700">Setup Costs:</span>
//                         <span className="text-sm text-gray-800 font-semibold">{analysis.budgetBreakdown.setup}</span>
//                       </div>
//                       <div className="flex justify-between">
//                         <span className="text-sm font-medium text-gray-700">Monthly Operations:</span>
//                         <span className="text-sm text-gray-800 font-semibold">{analysis.budgetBreakdown.operations}</span>
//                       </div>
//                       <div className="flex justify-between">
//                         <span className="text-sm font-medium text-gray-700">Marketing Budget:</span>
//                         <span className="text-sm text-gray-800 font-semibold">{analysis.budgetBreakdown.marketing}</span>
//                       </div>
//                     </div>
//                   </div>
//                 )}

//                 {/* Key Insights */}
//                 <div>
//                   <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center gap-2">
//                     <TrendingUp className="w-5 h-5 text-purple-600" />
//                     Key Insights
//                   </h3>
//                   <ul className="space-y-2">
//                     {analysis.keyInsights.map((insight, idx) => (
//                       <li key={idx} className="flex items-start gap-2 text-sm text-gray-600 bg-purple-50 p-3 rounded-lg">
//                         <span className="text-orange-600 font-bold mt-0.5">•</span>
//                         {insight}
//                       </li>
//                     ))}
//                   </ul>
//                 </div>
//               </div>
//             )}

//             {analysis && analysis.error && (
//               <div className="text-center text-red-500 py-12">
//                 <p>{analysis.error}</p>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
import React, { useState } from 'react';
import { MapPin, TrendingUp, DollarSign, Users, Loader2 } from 'lucide-react';

export default function MarketAdvisor() {
  const [businessInfo, setBusinessInfo] = useState({
    name: '',
    industry: '',
    currentLocation: '',
    budget: '',
    expansionType: 'both'
  });
  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(false);

  const indianCities = [
    "Mumbai", "Delhi", "Bangalore", "Hyderabad", "Chennai", "Kolkata", 
    "Pune", "Ahmedabad", "Surat", "Jaipur", "Lucknow", "Kanpur", 
    "Nagpur", "Indore", "Bhopal", "Visakhapatnam", "Vadodara", "Coimbatore",
    "Kochi", "Chandigarh", "Gurgaon", "Noida", "Ghaziabad", "Mysore"
  ];

  const industries = [
    "E-commerce", "SaaS/Technology", "Retail", "Food & Beverage", 
    "Healthcare", "Education/EdTech", "Manufacturing", "Logistics", 
    "Real Estate", "Fashion/Apparel", "FMCG", "Fintech"
  ];

  // 🔹 MOCK AI ANALYSIS
  const handleSubmit = () => {
    if (!businessInfo.name || !businessInfo.industry || !businessInfo.currentLocation || !businessInfo.budget) {
      return;
    }

    setLoading(true);
    setAnalysis(null);

    // ⏳ Fake AI delay
    setTimeout(() => {
      setAnalysis({
        topCities: [
          {
            name: "Indore",
            state: "Madhya Pradesh",
            tier: "Tier 2",
            demandScore: 86,
            reason: "Low operational cost, fast-growing consumer demand, and strong logistics connectivity"
          },
          {
            name: "Jaipur",
            state: "Rajasthan",
            tier: "Tier 2",
            demandScore: 81,
            reason: "High tourism-driven demand and increasing digital adoption"
          }
        ],
        marketAnalysis: {
          demandTrend: "Strong growth in Tier 2 Indian cities with rising disposable income",
          competition: "Moderate competition compared to metro cities",
          logisticsCost: "Lower logistics costs due to central locations and improved highways",
          regulatoryConsiderations: "GST registration required; state-wise trade licenses needed"
        },
        expansionStrategy: {
          recommended: businessInfo.expansionType,
          reasoning: "Hybrid expansion provides faster reach online while building local trust offline",
          timeline: "6–9 months phased rollout",
          localPartners: "Amazon India, Flipkart, Swiggy, Zomato"
        },
        keyInsights: [
          "Tier 2 cities are growing faster than Tier 1 metros",
          "UPI and digital payments adoption is very high",
          "Customer acquisition cost is lower outside metros",
          "Regional language marketing improves conversion"
        ],
        budgetBreakdown: {
          setup: "₹18–25 Lakhs",
          operations: "₹3–5 Lakhs per month",
          marketing: "₹2–3 Lakhs per month"
        }
      });

      setLoading(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-green-100 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2 flex items-center justify-center gap-2">
            <MapPin className="w-10 h-10 text-orange-600" />
            AI Market Expansion Advisor
          </h1>
          <p className="text-gray-600">Get data-driven insights for expanding your business across India 🇮🇳</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Input Form */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">Business Information</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Business Name
                </label>
                <input
                  type="text"
                  value={businessInfo.name}
                  onChange={(e) => setBusinessInfo({...businessInfo, name: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  placeholder="e.g., QuickBite Foods"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Industry
                </label>
                <select
                  value={businessInfo.industry}
                  onChange={(e) => setBusinessInfo({...businessInfo, industry: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                >
                  <option value="">Select Industry</option>
                  {industries.map((industry) => (
                    <option key={industry} value={industry}>{industry}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Current Location (City)
                </label>
                <select
                  value={businessInfo.currentLocation}
                  onChange={(e) => setBusinessInfo({...businessInfo, currentLocation: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                >
                  <option value="">Select City</option>
                  {indianCities.map((city) => (
                    <option key={city} value={city}>{city}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Expansion Budget (₹)
                </label>
                <select
                  value={businessInfo.budget}
                  onChange={(e) => setBusinessInfo({...businessInfo, budget: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                >
                  <option value="">Select Budget Range</option>
                  <option value="₹10L - ₹25L">₹10L - ₹25L</option>
                  <option value="₹25L - ₹50L">₹25L - ₹50L</option>
                  <option value="₹50L - ₹1Cr">₹50L - ₹1Cr</option>
                  <option value="₹1Cr - ₹2Cr">₹1Cr - ₹2Cr</option>
                  <option value="₹2Cr - ₹5Cr">₹2Cr - ₹5Cr</option>
                  <option value="₹5Cr+">₹5Cr+</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Expansion Type
                </label>
                <select
                  value={businessInfo.expansionType}
                  onChange={(e) => setBusinessInfo({...businessInfo, expansionType: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                >
                  <option value="both">Online & Offline (Hybrid)</option>
                  <option value="online">Online Only (E-commerce/Digital)</option>
                  <option value="offline">Offline Only (Physical Stores)</option>
                </select>
              </div>

              <button
                onClick={handleSubmit}
                disabled={loading}
                className="w-full bg-gradient-to-r from-orange-500 to-orange-600 text-white py-3 rounded-lg font-semibold hover:from-orange-600 hover:to-orange-700 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Analyzing Market...
                  </>
                ) : (
                  'Get Expansion Insights'
                )}
              </button>
            </div>
          </div>

          {/* Results Panel */}
          <div className="bg-white rounded-lg shadow-lg p-6 max-h-[650px] overflow-y-auto">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">Analysis Results</h2>
            
            {!analysis && !loading && (
              <div className="text-center text-gray-500 py-12">
                <MapPin className="w-16 h-16 mx-auto mb-4 text-gray-300" />
                <p>Fill out the form to get your India-specific expansion analysis</p>
              </div>
            )}

            {analysis && (
              <div className="space-y-6">
                {/* Top Cities */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center gap-2">
                    <MapPin className="w-5 h-5 text-orange-600" />
                    Recommended Cities
                  </h3>
                  <div className="space-y-3">
                    {analysis.topCities.map((city, idx) => (
                      <div key={idx} className="bg-orange-50 p-4 rounded-lg border border-orange-200">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <h4 className="font-semibold text-gray-800">{city.name}, {city.state}</h4>
                            <span className="text-xs text-gray-600">{city.tier}</span>
                          </div>
                          <span className="bg-orange-600 text-white px-2 py-1 rounded text-sm">
                            Score: {city.demandScore}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600">{city.reason}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Market Analysis */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-green-600" />
                    Market Analysis
                  </h3>
                  <div className="space-y-3">
                    {Object.entries(analysis.marketAnalysis).map(([key, value]) => (
                      <div key={key} className="bg-gray-50 p-3 rounded-lg">
                        <p className="text-sm font-medium text-gray-700 mb-1">{key.replace(/([A-Z])/g, ' $1')}</p>
                        <p className="text-sm text-gray-600">{value}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Expansion Strategy */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center gap-2">
                    <Users className="w-5 h-5 text-blue-600" />
                    Recommended Strategy
                  </h3>
                  <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                    <p className="font-semibold text-gray-800 mb-2 capitalize">
                      {analysis.expansionStrategy.recommended} Expansion
                    </p>
                    <p className="text-sm text-gray-600 mb-2">{analysis.expansionStrategy.reasoning}</p>
                    <p className="text-sm text-gray-500 mb-2">Timeline: {analysis.expansionStrategy.timeline}</p>
                    <p className="text-sm text-blue-700 font-medium">Local Partners: {analysis.expansionStrategy.localPartners}</p>
                  </div>
                </div>

                {/* Budget Breakdown */}
                {analysis.budgetBreakdown && (
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center gap-2">
                      {/* <Ruppes className="w-5 h-5 text-green-600" /> */}
                      Budget Breakdown
                    </h3>
                    <div className="bg-green-50 p-4 rounded-lg border border-green-200 space-y-2">
                      {Object.entries(analysis.budgetBreakdown).map(([key, value]) => (
                        <div key={key} className="flex justify-between">
                          <span className="text-sm font-medium text-gray-700">{key.charAt(0).toUpperCase() + key.slice(1)}</span>
                          <span className="text-sm text-gray-800 font-semibold">{value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Key Insights */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-purple-600" />
                    Key Insights
                  </h3>
                  <ul className="space-y-2">
                    {analysis.keyInsights.map((insight, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-sm text-gray-600 bg-purple-50 p-3 rounded-lg">
                        <span className="text-orange-600 font-bold mt-0.5">•</span>
                        {insight}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
