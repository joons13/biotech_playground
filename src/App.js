import React, { useState } from 'react';

const LiquidPropertiesChart = () => {
  // Comprehensive data for common laboratory liquids
  const liquidsData = [
    { 
      name: "Water", 
      density: 1.00, 
      viscosity: 0.89, 
      molarWeight: 18.02, 
      liquidClass: "Aqueous",
      notes: "Standard reference liquid" 
    },
    { 
      name: "Ethanol", 
      density: 0.79, 
      viscosity: 1.07, 
      molarWeight: 46.07, 
      liquidClass: "Organic-Low",
      notes: "Volatile, adjust for evaporation" 
    },
    { 
      name: "Methanol", 
      density: 0.79, 
      viscosity: 0.54, 
      molarWeight: 32.04, 
      liquidClass: "Organic-Low",
      notes: "Highly volatile" 
    },
    { 
      name: "Acetone", 
      density: 0.78, 
      viscosity: 0.31, 
      molarWeight: 58.08, 
      liquidClass: "Organic-Low",
      notes: "Very volatile, use slower aspiration" 
    },
    { 
      name: "Dimethyl Sulfoxide (DMSO)", 
      density: 1.10, 
      viscosity: 1.99, 
      molarWeight: 78.13, 
      liquidClass: "Organic-Medium",
      notes: "Common solvent for compounds" 
    },
    { 
      name: "Glycerol", 
      density: 1.26, 
      viscosity: 934, 
      molarWeight: 92.09, 
      liquidClass: "Viscous",
      notes: "Very viscous, requires slow handling" 
    },
    { 
      name: "Isopropanol", 
      density: 0.78, 
      viscosity: 2.04, 
      molarWeight: 60.10, 
      liquidClass: "Organic-Low",
      notes: "Moderate volatility" 
    },
    { 
      name: "Acetonitrile", 
      density: 0.78, 
      viscosity: 0.37, 
      molarWeight: 41.05, 
      liquidClass: "Organic-Low",
      notes: "Common HPLC solvent" 
    },
    { 
      name: "Hexane", 
      density: 0.66, 
      viscosity: 0.30, 
      molarWeight: 86.18, 
      liquidClass: "Organic-Low",
      notes: "Low surface tension, difficult to pipette" 
    },
    { 
      name: "Toluene", 
      density: 0.87, 
      viscosity: 0.59, 
      molarWeight: 92.14, 
      liquidClass: "Organic-Low",
      notes: "May affect plastic labware" 
    },
    { 
      name: "Chloroform", 
      density: 1.49, 
      viscosity: 0.54, 
      molarWeight: 119.38, 
      liquidClass: "Organic-High-Density",
      notes: "High density, may affect plastics" 
    },
    { 
      name: "Dichloromethane", 
      density: 1.33, 
      viscosity: 0.41, 
      molarWeight: 84.93, 
      liquidClass: "Organic-High-Density",
      notes: "Volatile, high density" 
    },
    { 
      name: "10% Glycerol Solution", 
      density: 1.02, 
      viscosity: 1.31, 
      molarWeight: "—", 
      liquidClass: "Aqueous-Viscous",
      notes: "Common buffer additive" 
    },
    { 
      name: "50% Glycerol Solution", 
      density: 1.13, 
      viscosity: 6.00, 
      molarWeight: "—", 
      liquidClass: "Viscous",
      notes: "Requires slow aspiration/dispensing" 
    },
    { 
      name: "Serum", 
      density: 1.02, 
      viscosity: 1.50, 
      molarWeight: "—", 
      liquidClass: "Serum",
      notes: "Protein-rich, adjust for tip wetting" 
    },
    { 
      name: "Phosphate Buffered Saline", 
      density: 1.01, 
      viscosity: 0.90, 
      molarWeight: "—", 
      liquidClass: "Aqueous-Buffer",
      notes: "Common biological buffer" 
    },
    { 
      name: "70% Ethanol", 
      density: 0.86, 
      viscosity: 2.43, 
      molarWeight: "—", 
      liquidClass: "Aqueous-Organic",
      notes: "Common disinfectant" 
    },
    { 
      name: "n-Butanol", 
      density: 0.81, 
      viscosity: 2.54, 
      molarWeight: 74.12, 
      liquidClass: "Organic-Medium",
      notes: "Moderate viscosity" 
    },
    { 
      name: "Acetic Acid (Glacial)", 
      density: 1.05, 
      viscosity: 1.13, 
      molarWeight: 60.05, 
      liquidClass: "Organic-Corrosive",
      notes: "Corrosive, adjust for volatility" 
    },
    { 
      name: "Diethyl Ether", 
      density: 0.71, 
      viscosity: 0.22, 
      molarWeight: 74.12, 
      liquidClass: "Organic-Low-Volatile",
      notes: "Extremely volatile, difficult to pipette" 
    }
  ];

  // Recommended Hamilton STAR liquid classes with detailed Venus settings
  const liquidClasses = [
    {
      name: "Aqueous",
      description: "For water and water-like solutions",
      pSpeed: {
        label: "Standard",
        value: "100-200 µL/s",
        venusSettings: "Aspirate Speed: 100-200 µL/s\nDelay Aspirate: 0-50 ms\nMixing Cycles: 3-5"
      },
      dSpeed: {
        label: "Standard",
        value: "100-200 µL/s",
        venusSettings: "Dispense Speed: 100-200 µL/s\nDelay Dispense: 0-50 ms\nEmpty Speed: 200-400 µL/s"
      },
      airGap: {
        label: "Small",
        value: "5-10 µL",
        venusSettings: "Pre-Aspirate Air Gap: 5-10 µL\nPost-Aspirate Air Gap: 0-5 µL\nEmpty Air Gap: 0 µL"
      },
      blowout: {
        label: "Required",
        value: "Standard",
        venusSettings: "Blowout Volume: 5-10 µL\nBlowout Speed: 200-400 µL/s\nChannel Pattern: All enabled"
      },
      zOffset: {
        label: "Standard",
        value: "0.5-1.0 mm",
        venusSettings: "Aspiration Immersion Depth: 0.5-1.0 mm\nDispense Immersion Depth: 0.5-1.0 mm\nBottom Report Offset: 0 mm"
      },
      tips: {
        label: "Standard",
        value: "Standard",
        venusSettings: "Tip Type: Standard\nTip Pattern: Full\nFilter Tips: Optional"
      }
    },
    {
      name: "Organic-Low",
      description: "For low viscosity organic solvents",
      pSpeed: {
        label: "Slow",
        value: "50-100 µL/s",
        venusSettings: "Aspirate Speed: 50-100 µL/s\nDelay Aspirate: 100-200 ms\nMixing Cycles: 2-3"
      },
      dSpeed: {
        label: "Slow",
        value: "50-100 µL/s",
        venusSettings: "Dispense Speed: 50-100 µL/s\nDelay Dispense: 100-200 ms\nEmpty Speed: 100-200 µL/s"
      },
      airGap: {
        label: "Large",
        value: "15-30 µL",
        venusSettings: "Pre-Aspirate Air Gap: 5-10 µL\nPost-Aspirate Air Gap: 10-20 µL\nEmpty Air Gap: 0 µL"
      },
      blowout: {
        label: "Required",
        value: "Enhanced",
        venusSettings: "Blowout Volume: 15-20 µL\nBlowout Speed: 100-150 µL/s\nChannel Pattern: All enabled"
      },
      zOffset: {
        label: "Low",
        value: "0.2-0.5 mm",
        venusSettings: "Aspiration Immersion Depth: 0.2-0.5 mm\nDispense Immersion Depth: 0.2-0.5 mm\nBottom Report Offset: 0.2 mm"
      },
      tips: {
        label: "Conductive",
        value: "Black conductive",
        venusSettings: "Tip Type: Conductive\nTip Pattern: Full\nFilter Tips: Recommended for volatile solvents"
      }
    },
    {
      name: "Organic-Medium",
      description: "For medium viscosity organic solvents",
      pSpeed: {
        label: "Slow",
        value: "40-80 µL/s",
        venusSettings: "Aspirate Speed: 40-80 µL/s\nDelay Aspirate: 200-300 ms\nMixing Cycles: 2-3"
      },
      dSpeed: {
        label: "Medium",
        value: "80-150 µL/s",
        venusSettings: "Dispense Speed: 80-150 µL/s\nDelay Dispense: 100-200 ms\nEmpty Speed: 100-200 µL/s"
      },
      airGap: {
        label: "Medium",
        value: "10-20 µL",
        venusSettings: "Pre-Aspirate Air Gap: 5-10 µL\nPost-Aspirate Air Gap: 5-10 µL\nEmpty Air Gap: 0 µL"
      },
      blowout: {
        label: "Required",
        value: "Enhanced",
        venusSettings: "Blowout Volume: 15-20 µL\nBlowout Speed: 100-150 µL/s\nChannel Pattern: All enabled"
      },
      zOffset: {
        label: "Low",
        value: "0.2-0.5 mm",
        venusSettings: "Aspiration Immersion Depth: 0.2-0.5 mm\nDispense Immersion Depth: 0.2-0.5 mm\nBottom Report Offset: 0.2 mm"
      },
      tips: {
        label: "Conductive",
        value: "Black conductive",
        venusSettings: "Tip Type: Conductive\nTip Pattern: Full\nFilter Tips: Recommended"
      }
    },
    {
      name: "Organic-High-Density",
      description: "For dense organic solvents like chloroform",
      pSpeed: {
        label: "Very Slow",
        value: "20-40 µL/s",
        venusSettings: "Aspirate Speed: 20-40 µL/s\nDelay Aspirate: 300-500 ms\nMixing Cycles: 1-2"
      },
      dSpeed: {
        label: "Slow",
        value: "40-80 µL/s",
        venusSettings: "Dispense Speed: 40-80 µL/s\nDelay Dispense: 200-300 ms\nEmpty Speed: 80-120 µL/s"
      },
      airGap: {
        label: "Large",
        value: "20-30 µL",
        venusSettings: "Pre-Aspirate Air Gap: 5-10 µL\nPost-Aspirate Air Gap: 15-20 µL\nEmpty Air Gap: 0 µL"
      },
      blowout: {
        label: "Required",
        value: "Extended",
        venusSettings: "Blowout Volume: 20-30 µL\nBlowout Speed: 80-120 µL/s\nChannel Pattern: All enabled"
      },
      zOffset: {
        label: "Low",
        value: "0.1-0.3 mm",
        venusSettings: "Aspiration Immersion Depth: 0.1-0.3 mm\nDispense Immersion Depth: 0.1-0.3 mm\nBottom Report Offset: 0.2 mm"
      },
      tips: {
        label: "Conductive",
        value: "Chemical-resistant",
        venusSettings: "Tip Type: Conductive, Chemical-resistant\nTip Pattern: Full\nFilter Tips: Required"
      }
    },
    {
      name: "Organic-Low-Volatile",
      description: "For highly volatile organics",
      pSpeed: {
        label: "Very Slow",
        value: "10-30 µL/s",
        venusSettings: "Aspirate Speed: 10-30 µL/s\nDelay Aspirate: 500-1000 ms\nMixing Cycles: 0-1"
      },
      dSpeed: {
        label: "Very Slow",
        value: "10-30 µL/s",
        venusSettings: "Dispense Speed: 10-30 µL/s\nDelay Dispense: 300-500 ms\nEmpty Speed: 50-100 µL/s"
      },
      airGap: {
        label: "Extra Large",
        value: "30-50 µL",
        venusSettings: "Pre-Aspirate Air Gap: 10-15 µL\nPost-Aspirate Air Gap: 20-35 µL\nEmpty Air Gap: 0 µL"
      },
      blowout: {
        label: "Required",
        value: "Maximum",
        venusSettings: "Blowout Volume: 25-40 µL\nBlowout Speed: 50-100 µL/s\nChannel Pattern: All enabled"
      },
      zOffset: {
        label: "Low",
        value: "0.1-0.3 mm",
        venusSettings: "Aspiration Immersion Depth: 0.1-0.3 mm\nDispense Immersion Depth: 0.1-0.3 mm\nBottom Report Offset: 0.3 mm"
      },
      tips: {
        label: "Conductive",
        value: "Chemical-resistant",
        venusSettings: "Tip Type: Conductive, Chemical-resistant\nTip Pattern: Full\nFilter Tips: Required\nDisable Tip Touch: Yes"
      }
    },
    {
      name: "Organic-Corrosive",
      description: "For corrosive organic solvents",
      pSpeed: {
        label: "Slow",
        value: "40-80 µL/s",
        venusSettings: "Aspirate Speed: 40-80 µL/s\nDelay Aspirate: 200-300 ms\nMixing Cycles: 1-2"
      },
      dSpeed: {
        label: "Medium",
        value: "80-120 µL/s",
        venusSettings: "Dispense Speed: 80-120 µL/s\nDelay Dispense: 100-200 ms\nEmpty Speed: 100-150 µL/s"
      },
      airGap: {
        label: "Large",
        value: "15-25 µL",
        venusSettings: "Pre-Aspirate Air Gap: 5-10 µL\nPost-Aspirate Air Gap: 10-15 µL\nEmpty Air Gap: 0 µL"
      },
      blowout: {
        label: "Required",
        value: "Enhanced",
        venusSettings: "Blowout Volume: 15-25 µL\nBlowout Speed: 100-150 µL/s\nChannel Pattern: All enabled"
      },
      zOffset: {
        label: "Medium",
        value: "0.5-1.0 mm",
        venusSettings: "Aspiration Immersion Depth: 0.5-1.0 mm\nDispense Immersion Depth: 0.5-1.0 mm\nBottom Report Offset: 0.2 mm"
      },
      tips: {
        label: "Resistant",
        value: "Chemical-resistant",
        venusSettings: "Tip Type: Chemical-resistant\nTip Pattern: Full\nFilter Tips: Required\nEnable Extra Wash Steps: Yes"
      }
    },
    {
      name: "Viscous",
      description: "For highly viscous liquids like glycerol",
      pSpeed: {
        label: "Very Slow",
        value: "5-20 µL/s",
        venusSettings: "Aspirate Speed: 5-20 µL/s\nDelay Aspirate: 1000-3000 ms\nMixing Cycles: 0-1"
      },
      dSpeed: {
        label: "Very Slow",
        value: "5-20 µL/s",
        venusSettings: "Dispense Speed: 5-20 µL/s\nDelay Dispense: 1000-3000 ms\nEmpty Speed: 20-40 µL/s"
      },
      airGap: {
        label: "Small",
        value: "5-10 µL",
        venusSettings: "Pre-Aspirate Air Gap: 0-5 µL\nPost-Aspirate Air Gap: 5-10 µL\nEmpty Air Gap: 0 µL"
      },
      blowout: {
        label: "Extended",
        value: "Maximum",
        venusSettings: "Blowout Volume: 30-50 µL\nBlowout Speed: 20-40 µL/s\nChannel Pattern: All enabled\nExtend Blowout Time: Yes"
      },
      zOffset: {
        label: "High",
        value: "1.0-2.0 mm",
        venusSettings: "Aspiration Immersion Depth: 1.0-2.0 mm\nDispense Immersion Depth: 1.0-2.0 mm\nBottom Report Offset: 0 mm"
      },
      tips: {
        label: "Wide Bore",
        value: "Wide Bore",
        venusSettings: "Tip Type: Wide Bore\nTip Pattern: Full\nFilter Tips: Not recommended\nTip Size: Use larger volume tip if possible"
      }
    },
    {
      name: "Aqueous-Viscous",
      description: "For moderately viscous aqueous solutions",
      pSpeed: {
        label: "Medium",
        value: "50-100 µL/s",
        venusSettings: "Aspirate Speed: 50-100 µL/s\nDelay Aspirate: 300-500 ms\nMixing Cycles: 2-3"
      },
      dSpeed: {
        label: "Medium",
        value: "50-100 µL/s",
        venusSettings: "Dispense Speed: 50-100 µL/s\nDelay Dispense: 300-500 ms\nEmpty Speed: 100-150 µL/s"
      },
      airGap: {
        label: "Small",
        value: "5-10 µL",
        venusSettings: "Pre-Aspirate Air Gap: 0-5 µL\nPost-Aspirate Air Gap: 5-10 µL\nEmpty Air Gap: 0 µL"
      },
      blowout: {
        label: "Extended",
        value: "Enhanced",
        venusSettings: "Blowout Volume: 15-25 µL\nBlowout Speed: 100-150 µL/s\nChannel Pattern: All enabled\nExtend Blowout Time: Yes"
      },
      zOffset: {
        label: "Medium",
        value: "0.5-1.0 mm",
        venusSettings: "Aspiration Immersion Depth: 0.5-1.0 mm\nDispense Immersion Depth: 0.5-1.0 mm\nBottom Report Offset: 0 mm"
      },
      tips: {
        label: "Standard",
        value: "Standard or Wide Bore",
        venusSettings: "Tip Type: Standard or Wide Bore\nTip Pattern: Full\nFilter Tips: Optional\nTip Size: Match to volume"
      }
    },
    {
      name: "Serum",
      description: "For serum and protein-rich solutions",
      pSpeed: {
        label: "Medium",
        value: "50-100 µL/s",
        venusSettings: "Aspirate Speed: 50-100 µL/s\nDelay Aspirate: 200-400 ms\nMixing Cycles: 3-5"
      },
      dSpeed: {
        label: "Medium",
        value: "50-100 µL/s",
        venusSettings: "Dispense Speed: 50-100 µL/s\nDelay Dispense: 200-400 ms\nEmpty Speed: 100-200 µL/s"
      },
      airGap: {
        label: "Medium",
        value: "10-15 µL",
        venusSettings: "Pre-Aspirate Air Gap: 5 µL\nPost-Aspirate Air Gap: 5-10 µL\nEmpty Air Gap: 0 µL"
      },
      blowout: {
        label: "Required",
        value: "Enhanced",
        venusSettings: "Blowout Volume: 15-20 µL\nBlowout Speed: 100-150 µL/s\nChannel Pattern: All enabled\nTip Touch: Enabled"
      },
      zOffset: {
        label: "Medium",
        value: "0.5-1.0 mm",
        venusSettings: "Aspiration Immersion Depth: 0.5-1.0 mm\nDispense Immersion Depth: 0.5-1.0 mm\nBottom Report Offset: 0 mm"
      },
      tips: {
        label: "Low Retention",
        value: "Low Retention",
        venusSettings: "Tip Type: Low Retention\nTip Pattern: Full\nFilter Tips: Recommended\nTip Touch Mode: Side wall"
      }
    },
    {
      name: "Aqueous-Buffer",
      description: "For common laboratory buffers",
      pSpeed: {
        label: "Standard",
        value: "100-200 µL/s",
        venusSettings: "Aspirate Speed: 100-200 µL/s\nDelay Aspirate: 50-100 ms\nMixing Cycles: 3-5"
      },
      dSpeed: {
        label: "Standard",
        value: "100-200 µL/s",
        venusSettings: "Dispense Speed: 100-200 µL/s\nDelay Dispense: 50-100 ms\nEmpty Speed: 200-300 µL/s"
      },
      airGap: {
        label: "Small",
        value: "5-10 µL",
        venusSettings: "Pre-Aspirate Air Gap: 0-5 µL\nPost-Aspirate Air Gap: 5 µL\nEmpty Air Gap: 0 µL"
      },
      blowout: {
        label: "Required",
        value: "Standard",
        venusSettings: "Blowout Volume: 10-15 µL\nBlowout Speed: 150-250 µL/s\nChannel Pattern: All enabled"
      },
      zOffset: {
        label: "Standard",
        value: "0.5-1.0 mm",
        venusSettings: "Aspiration Immersion Depth: 0.5-1.0 mm\nDispense Immersion Depth: 0.5-1.0 mm\nBottom Report Offset: 0 mm"
      },
      tips: {
        label: "Standard",
        value: "Standard",
        venusSettings: "Tip Type: Standard\nTip Pattern: Full\nFilter Tips: Optional for sterile applications"
      }
    },
    {
      name: "Aqueous-Organic",
      description: "For water-organic mixtures",
      pSpeed: {
        label: "Medium",
        value: "75-150 µL/s",
        venusSettings: "Aspirate Speed: 75-150 µL/s\nDelay Aspirate: 100-200 ms\nMixing Cycles: 3-4"
      },
      dSpeed: {
        label: "Medium",
        value: "75-150 µL/s",
        venusSettings: "Dispense Speed: 75-150 µL/s\nDelay Dispense: 100-200 ms\nEmpty Speed: 150-250 µL/s"
      },
      airGap: {
        label: "Medium",
        value: "10-15 µL",
        venusSettings: "Pre-Aspirate Air Gap: 5 µL\nPost-Aspirate Air Gap: 5-10 µL\nEmpty Air Gap: 0 µL"
      },
      blowout: {
        label: "Required",
        value: "Enhanced",
        venusSettings: "Blowout Volume: 10-20 µL\nBlowout Speed: 150-200 µL/s\nChannel Pattern: All enabled"
      },
      zOffset: {
        label: "Low",
        value: "0.3-0.8 mm",
        venusSettings: "Aspiration Immersion Depth: 0.3-0.8 mm\nDispense Immersion Depth: 0.3-0.8 mm\nBottom Report Offset: 0.1 mm"
      },
      tips: {
        label: "Conductive",
        value: "Conductive",
        venusSettings: "Tip Type: Conductive\nTip Pattern: Full\nFilter Tips: Recommended\nEnable Tip Touch: Yes"
      }
    }
  ];

  // State for selected liquid class and selected parameter
  const [selectedClass, setSelectedClass] = useState("");
  const [selectedParam, setSelectedParam] = useState("");
  
  // Get filtered liquids based on selected class
  const filteredLiquids = selectedClass 
    ? liquidsData.filter(liquid => liquid.liquidClass === selectedClass)
    : liquidsData;
    
  // Get the selected liquid class details
  const selectedClassDetails = liquidClasses.find(cls => cls.name === selectedClass);

  // Get selected parameter details
  const getSelectedParamDetails = () => {
    if (!selectedClassDetails || !selectedParam) return null;
    return selectedClassDetails[selectedParam];
  };

  const paramDetails = getSelectedParamDetails();

  return (
    <div className="p-4 max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Laboratory Liquid Properties for Hamilton STAR</h1>
      
      <div className="mb-6">
        <label className="font-semibold block mb-2">Filter by Liquid Class:</label>
        <select 
          className="p-2 border rounded w-64"
          value={selectedClass}
          onChange={(e) => setSelectedClass(e.target.value)}
        >
          <option value="">All Liquid Classes</option>
          {liquidClasses.map(cls => (
            <option key={cls.name} value={cls.name}>{cls.name}</option>
          ))}
        </select>
      </div>
      
      {selectedClassDetails && (
        <div className="mb-6 p-4 bg-blue-50 rounded-lg">
          <h2 className="text-xl font-bold mb-2">{selectedClassDetails.name} Settings</h2>
          <p className="mb-2">{selectedClassDetails.description}</p>
          
          <div className="grid grid-cols-3 gap-4 mt-4">
            <div onClick={() => setSelectedParam("pSpeed")} className="p-2 bg-white rounded cursor-pointer hover:bg-blue-100">
              <p><span className="font-semibold">Pipetting Speed:</span> {selectedClassDetails.pSpeed.label} ({selectedClassDetails.pSpeed.value})</p>
            </div>
            <div onClick={() => setSelectedParam("dSpeed")} className="p-2 bg-white rounded cursor-pointer hover:bg-blue-100">
              <p><span className="font-semibold">Dispensing Speed:</span> {selectedClassDetails.dSpeed.label} ({selectedClassDetails.dSpeed.value})</p>
            </div>
            <div onClick={() => setSelectedParam("airGap")} className="p-2 bg-white rounded cursor-pointer hover:bg-blue-100">
              <p><span className="font-semibold">Air Gap:</span> {selectedClassDetails.airGap.label} ({selectedClassDetails.airGap.value})</p>
            </div>
            <div onClick={() => setSelectedParam("blowout")} className="p-2 bg-white rounded cursor-pointer hover:bg-blue-100">
              <p><span className="font-semibold">Blowout:</span> {selectedClassDetails.blowout.label} ({selectedClassDetails.blowout.value})</p>
            </div>
            <div onClick={() => setSelectedParam("zOffset")} className="p-2 bg-white rounded cursor-pointer hover:bg-blue-100">
              <p><span className="font-semibold">Z-Offset:</span> {selectedClassDetails.zOffset.label} ({selectedClassDetails.zOffset.value})</p>
            </div>
            <div onClick={() => setSelectedParam("tips")} className="p-2 bg-white rounded cursor-pointer hover:bg-blue-100">
              <p><span className="font-semibold">Recommended Tips:</span> {selectedClassDetails.tips.label} ({selectedClassDetails.tips.value})</p>
            </div>
          </div>
          
          {paramDetails && (
            <div className="mt-4 p-4 bg-white rounded-lg border border-blue-200">
              <h3 className="font-bold text-lg mb-2">Venus Parameter Details: {selectedParam.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}</h3>
              <pre className="bg-gray-50 p-3 rounded whitespace-pre-wrap font-mono text-sm">{paramDetails.venusSettings}</pre>
            </div>
          )}
        </div>
      )}

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border rounded-lg">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-3 text-left">Liquid</th>
              <th className="p-3 text-left">Density (g/mL)</th>
              <th className="p-3 text-left">Viscosity (cP)</th>
              <th className="p-3 text-left">Molar Weight (g/mol)</th>
              <th className="p-3 text-left">Liquid Class</th>
              <th className="p-3 text-left">Notes</th>
            </tr>
          </thead>
          <tbody>
            {filteredLiquids.map((liquid, index) => (
              <tr key={liquid.name} className={index % 2 === 0 ? 'bg-gray-50' : ''}>
                <td className="p-3">{liquid.name}</td>
                <td className="p-3">{liquid.density}</td>
                <td className="p-3">{liquid.viscosity}</td>
                <td className="p-3">{liquid.molarWeight}</td>
                <td className="p-3">{liquid.liquidClass}</td>
                <td className="p-3">{liquid.notes}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LiquidPropertiesChart;