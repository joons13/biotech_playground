from dataclasses import dataclass
from typing import List, Optional, Dict, Any


@dataclass
class Liquid:
    """Represents a laboratory liquid with its properties."""
    name: str
    density: float
    viscosity: float
    molar_weight: str  # Can be "—" for solutions
    liquid_class: str
    notes: str


@dataclass
class ParameterSettings:
    """Represents parameter settings for a liquid class."""
    label: str
    value: str
    venus_settings: str


@dataclass
class LiquidClass:
    """Represents a liquid class with all its parameter settings."""
    name: str
    description: str
    p_speed: ParameterSettings
    d_speed: ParameterSettings
    air_gap: ParameterSettings
    blowout: ParameterSettings
    z_offset: ParameterSettings
    tips: ParameterSettings


class LiquidDatabase:
    """Database class containing all liquid and liquid class data."""
    
    def __init__(self):
        self.liquids_data = self._initialize_liquids()
        self.liquid_classes = self._initialize_liquid_classes()
    
    def _initialize_liquids(self) -> List[Liquid]:
        """Initialize the comprehensive data for common laboratory liquids."""
        return [
            Liquid(
                name="Water",
                density=1.00,
                viscosity=0.89,
                molar_weight="18.02",
                liquid_class="Aqueous",
                notes="Standard reference liquid"
            ),
            Liquid(
                name="Ethanol",
                density=0.79,
                viscosity=1.07,
                molar_weight="46.07",
                liquid_class="Organic-Low",
                notes="Volatile, adjust for evaporation"
            ),
            Liquid(
                name="Methanol",
                density=0.79,
                viscosity=0.54,
                molar_weight="32.04",
                liquid_class="Organic-Low",
                notes="Highly volatile"
            ),
            Liquid(
                name="Acetone",
                density=0.78,
                viscosity=0.31,
                molar_weight="58.08",
                liquid_class="Organic-Low",
                notes="Very volatile, use slower aspiration"
            ),
            Liquid(
                name="Dimethyl Sulfoxide (DMSO)",
                density=1.10,
                viscosity=1.99,
                molar_weight="78.13",
                liquid_class="Organic-Medium",
                notes="Common solvent for compounds"
            ),
            Liquid(
                name="Glycerol",
                density=1.26,
                viscosity=934,
                molar_weight="92.09",
                liquid_class="Viscous",
                notes="Very viscous, requires slow handling"
            ),
            Liquid(
                name="Isopropanol",
                density=0.78,
                viscosity=2.04,
                molar_weight="60.10",
                liquid_class="Organic-Low",
                notes="Moderate volatility"
            ),
            Liquid(
                name="Acetonitrile",
                density=0.78,
                viscosity=0.37,
                molar_weight="41.05",
                liquid_class="Organic-Low",
                notes="Common HPLC solvent"
            ),
            Liquid(
                name="Hexane",
                density=0.66,
                viscosity=0.30,
                molar_weight="86.18",
                liquid_class="Organic-Low",
                notes="Low surface tension, difficult to pipette"
            ),
            Liquid(
                name="Toluene",
                density=0.87,
                viscosity=0.59,
                molar_weight="92.14",
                liquid_class="Organic-Low",
                notes="May affect plastic labware"
            ),
            Liquid(
                name="Chloroform",
                density=1.49,
                viscosity=0.54,
                molar_weight="119.38",
                liquid_class="Organic-High-Density",
                notes="High density, may affect plastics"
            ),
            Liquid(
                name="Dichloromethane",
                density=1.33,
                viscosity=0.41,
                molar_weight="84.93",
                liquid_class="Organic-High-Density",
                notes="Volatile, high density"
            ),
            Liquid(
                name="10% Glycerol Solution",
                density=1.02,
                viscosity=1.31,
                molar_weight="—",
                liquid_class="Aqueous-Viscous",
                notes="Common buffer additive"
            ),
            Liquid(
                name="50% Glycerol Solution",
                density=1.13,
                viscosity=6.00,
                molar_weight="—",
                liquid_class="Viscous",
                notes="Requires slow aspiration/dispensing"
            ),
            Liquid(
                name="Serum",
                density=1.02,
                viscosity=1.50,
                molar_weight="—",
                liquid_class="Serum",
                notes="Protein-rich, adjust for tip wetting"
            ),
            Liquid(
                name="Phosphate Buffered Saline",
                density=1.01,
                viscosity=0.90,
                molar_weight="—",
                liquid_class="Aqueous-Buffer",
                notes="Common biological buffer"
            ),
            Liquid(
                name="70% Ethanol",
                density=0.86,
                viscosity=2.43,
                molar_weight="—",
                liquid_class="Aqueous-Organic",
                notes="Common disinfectant"
            ),
            Liquid(
                name="n-Butanol",
                density=0.81,
                viscosity=2.54,
                molar_weight="74.12",
                liquid_class="Organic-Medium",
                notes="Moderate viscosity"
            ),
            Liquid(
                name="Acetic Acid (Glacial)",
                density=1.05,
                viscosity=1.13,
                molar_weight="60.05",
                liquid_class="Organic-Corrosive",
                notes="Corrosive, adjust for volatility"
            ),
            Liquid(
                name="Diethyl Ether",
                density=0.71,
                viscosity=0.22,
                molar_weight="74.12",
                liquid_class="Organic-Low-Volatile",
                notes="Extremely volatile, difficult to pipette"
            )
        ]
    
    def _initialize_liquid_classes(self) -> List[LiquidClass]:
        """Initialize recommended Hamilton STAR liquid classes with detailed Venus settings."""
        return [
            LiquidClass(
                name="Aqueous",
                description="For water and water-like solutions",
                p_speed=ParameterSettings(
                    label="Standard",
                    value="100-200 µL/s",
                    venus_settings="Aspirate Speed: 100-200 µL/s\nDelay Aspirate: 0-50 ms\nMixing Cycles: 3-5"
                ),
                d_speed=ParameterSettings(
                    label="Standard",
                    value="100-200 µL/s",
                    venus_settings="Dispense Speed: 100-200 µL/s\nDelay Dispense: 0-50 ms\nEmpty Speed: 200-400 µL/s"
                ),
                air_gap=ParameterSettings(
                    label="Small",
                    value="5-10 µL",
                    venus_settings="Pre-Aspirate Air Gap: 5-10 µL\nPost-Aspirate Air Gap: 0-5 µL\nEmpty Air Gap: 0 µL"
                ),
                blowout=ParameterSettings(
                    label="Required",
                    value="Standard",
                    venus_settings="Blowout Volume: 5-10 µL\nBlowout Speed: 200-400 µL/s\nChannel Pattern: All enabled"
                ),
                z_offset=ParameterSettings(
                    label="Standard",
                    value="0.5-1.0 mm",
                    venus_settings="Aspiration Immersion Depth: 0.5-1.0 mm\nDispense Immersion Depth: 0.5-1.0 mm\nBottom Report Offset: 0 mm"
                ),
                tips=ParameterSettings(
                    label="Standard",
                    value="Standard",
                    venus_settings="Tip Type: Standard\nTip Pattern: Full\nFilter Tips: Optional"
                )
            ),
            LiquidClass(
                name="Organic-Low",
                description="For low viscosity organic solvents",
                p_speed=ParameterSettings(
                    label="Slow",
                    value="50-100 µL/s",
                    venus_settings="Aspirate Speed: 50-100 µL/s\nDelay Aspirate: 100-200 ms\nMixing Cycles: 2-3"
                ),
                d_speed=ParameterSettings(
                    label="Slow",
                    value="50-100 µL/s",
                    venus_settings="Dispense Speed: 50-100 µL/s\nDelay Dispense: 100-200 ms\nEmpty Speed: 100-200 µL/s"
                ),
                air_gap=ParameterSettings(
                    label="Large",
                    value="15-30 µL",
                    venus_settings="Pre-Aspirate Air Gap: 5-10 µL\nPost-Aspirate Air Gap: 10-20 µL\nEmpty Air Gap: 0 µL"
                ),
                blowout=ParameterSettings(
                    label="Required",
                    value="Enhanced",
                    venus_settings="Blowout Volume: 15-20 µL\nBlowout Speed: 100-150 µL/s\nChannel Pattern: All enabled"
                ),
                z_offset=ParameterSettings(
                    label="Low",
                    value="0.2-0.5 mm",
                    venus_settings="Aspiration Immersion Depth: 0.2-0.5 mm\nDispense Immersion Depth: 0.2-0.5 mm\nBottom Report Offset: 0.2 mm"
                ),
                tips=ParameterSettings(
                    label="Conductive",
                    value="Black conductive",
                    venus_settings="Tip Type: Conductive\nTip Pattern: Full\nFilter Tips: Recommended for volatile solvents"
                )
            ),
            LiquidClass(
                name="Organic-Medium",
                description="For medium viscosity organic solvents",
                p_speed=ParameterSettings(
                    label="Slow",
                    value="40-80 µL/s",
                    venus_settings="Aspirate Speed: 40-80 µL/s\nDelay Aspirate: 200-300 ms\nMixing Cycles: 2-3"
                ),
                d_speed=ParameterSettings(
                    label="Medium",
                    value="80-150 µL/s",
                    venus_settings="Dispense Speed: 80-150 µL/s\nDelay Dispense: 100-200 ms\nEmpty Speed: 100-200 µL/s"
                ),
                air_gap=ParameterSettings(
                    label="Medium",
                    value="10-20 µL",
                    venus_settings="Pre-Aspirate Air Gap: 5-10 µL\nPost-Aspirate Air Gap: 5-10 µL\nEmpty Air Gap: 0 µL"
                ),
                blowout=ParameterSettings(
                    label="Required",
                    value="Enhanced",
                    venus_settings="Blowout Volume: 15-20 µL\nBlowout Speed: 100-150 µL/s\nChannel Pattern: All enabled"
                ),
                z_offset=ParameterSettings(
                    label="Low",
                    value="0.2-0.5 mm",
                    venus_settings="Aspiration Immersion Depth: 0.2-0.5 mm\nDispense Immersion Depth: 0.2-0.5 mm\nBottom Report Offset: 0.2 mm"
                ),
                tips=ParameterSettings(
                    label="Conductive",
                    value="Black conductive",
                    venus_settings="Tip Type: Conductive\nTip Pattern: Full\nFilter Tips: Recommended"
                )
            ),
            LiquidClass(
                name="Organic-High-Density",
                description="For dense organic solvents like chloroform",
                p_speed=ParameterSettings(
                    label="Very Slow",
                    value="20-40 µL/s",
                    venus_settings="Aspirate Speed: 20-40 µL/s\nDelay Aspirate: 300-500 ms\nMixing Cycles: 1-2"
                ),
                d_speed=ParameterSettings(
                    label="Slow",
                    value="40-80 µL/s",
                    venus_settings="Dispense Speed: 40-80 µL/s\nDelay Dispense: 200-300 ms\nEmpty Speed: 80-120 µL/s"
                ),
                air_gap=ParameterSettings(
                    label="Large",
                    value="20-30 µL",
                    venus_settings="Pre-Aspirate Air Gap: 5-10 µL\nPost-Aspirate Air Gap: 15-20 µL\nEmpty Air Gap: 0 µL"
                ),
                blowout=ParameterSettings(
                    label="Required",
                    value="Extended",
                    venus_settings="Blowout Volume: 20-30 µL\nBlowout Speed: 80-120 µL/s\nChannel Pattern: All enabled"
                ),
                z_offset=ParameterSettings(
                    label="Low",
                    value="0.1-0.3 mm",
                    venus_settings="Aspiration Immersion Depth: 0.1-0.3 mm\nDispense Immersion Depth: 0.1-0.3 mm\nBottom Report Offset: 0.2 mm"
                ),
                tips=ParameterSettings(
                    label="Conductive",
                    value="Chemical-resistant",
                    venus_settings="Tip Type: Conductive, Chemical-resistant\nTip Pattern: Full\nFilter Tips: Required"
                )
            ),
            LiquidClass(
                name="Organic-Low-Volatile",
                description="For highly volatile organics",
                p_speed=ParameterSettings(
                    label="Very Slow",
                    value="10-30 µL/s",
                    venus_settings="Aspirate Speed: 10-30 µL/s\nDelay Aspirate: 500-1000 ms\nMixing Cycles: 0-1"
                ),
                d_speed=ParameterSettings(
                    label="Very Slow",
                    value="10-30 µL/s",
                    venus_settings="Dispense Speed: 10-30 µL/s\nDelay Dispense: 300-500 ms\nEmpty Speed: 50-100 µL/s"
                ),
                air_gap=ParameterSettings(
                    label="Extra Large",
                    value="30-50 µL",
                    venus_settings="Pre-Aspirate Air Gap: 10-15 µL\nPost-Aspirate Air Gap: 20-35 µL\nEmpty Air Gap: 0 µL"
                ),
                blowout=ParameterSettings(
                    label="Required",
                    value="Maximum",
                    venus_settings="Blowout Volume: 25-40 µL\nBlowout Speed: 50-100 µL/s\nChannel Pattern: All enabled"
                ),
                z_offset=ParameterSettings(
                    label="Low",
                    value="0.1-0.3 mm",
                    venus_settings="Aspiration Immersion Depth: 0.1-0.3 mm\nDispense Immersion Depth: 0.1-0.3 mm\nBottom Report Offset: 0.3 mm"
                ),
                tips=ParameterSettings(
                    label="Conductive",
                    value="Chemical-resistant",
                    venus_settings="Tip Type: Conductive, Chemical-resistant\nTip Pattern: Full\nFilter Tips: Required\nDisable Tip Touch: Yes"
                )
            ),
            LiquidClass(
                name="Organic-Corrosive",
                description="For corrosive organic solvents",
                p_speed=ParameterSettings(
                    label="Slow",
                    value="40-80 µL/s",
                    venus_settings="Aspirate Speed: 40-80 µL/s\nDelay Aspirate: 200-300 ms\nMixing Cycles: 1-2"
                ),
                d_speed=ParameterSettings(
                    label="Medium",
                    value="80-120 µL/s",
                    venus_settings="Dispense Speed: 80-120 µL/s\nDelay Dispense: 100-200 ms\nEmpty Speed: 100-150 µL/s"
                ),
                air_gap=ParameterSettings(
                    label="Large",
                    value="15-25 µL",
                    venus_settings="Pre-Aspirate Air Gap: 5-10 µL\nPost-Aspirate Air Gap: 10-15 µL\nEmpty Air Gap: 0 µL"
                ),
                blowout=ParameterSettings(
                    label="Required",
                    value="Enhanced",
                    venus_settings="Blowout Volume: 15-25 µL\nBlowout Speed: 100-150 µL/s\nChannel Pattern: All enabled"
                ),
                z_offset=ParameterSettings(
                    label="Medium",
                    value="0.5-1.0 mm",
                    venus_settings="Aspiration Immersion Depth: 0.5-1.0 mm\nDispense Immersion Depth: 0.5-1.0 mm\nBottom Report Offset: 0.2 mm"
                ),
                tips=ParameterSettings(
                    label="Resistant",
                    value="Chemical-resistant",
                    venus_settings="Tip Type: Chemical-resistant\nTip Pattern: Full\nFilter Tips: Required\nEnable Extra Wash Steps: Yes"
                )
            ),
            LiquidClass(
                name="Viscous",
                description="For highly viscous liquids like glycerol",
                p_speed=ParameterSettings(
                    label="Very Slow",
                    value="5-20 µL/s",
                    venus_settings="Aspirate Speed: 5-20 µL/s\nDelay Aspirate: 1000-3000 ms\nMixing Cycles: 0-1"
                ),
                d_speed=ParameterSettings(
                    label="Very Slow",
                    value="5-20 µL/s",
                    venus_settings="Dispense Speed: 5-20 µL/s\nDelay Dispense: 1000-3000 ms\nEmpty Speed: 20-40 µL/s"
                ),
                air_gap=ParameterSettings(
                    label="Small",
                    value="5-10 µL",
                    venus_settings="Pre-Aspirate Air Gap: 0-5 µL\nPost-Aspirate Air Gap: 5-10 µL\nEmpty Air Gap: 0 µL"
                ),
                blowout=ParameterSettings(
                    label="Extended",
                    value="Maximum",
                    venus_settings="Blowout Volume: 30-50 µL\nBlowout Speed: 20-40 µL/s\nChannel Pattern: All enabled\nExtend Blowout Time: Yes"
                ),
                z_offset=ParameterSettings(
                    label="High",
                    value="1.0-2.0 mm",
                    venus_settings="Aspiration Immersion Depth: 1.0-2.0 mm\nDispense Immersion Depth: 1.0-2.0 mm\nBottom Report Offset: 0 mm"
                ),
                tips=ParameterSettings(
                    label="Wide Bore",
                    value="Wide Bore",
                    venus_settings="Tip Type: Wide Bore\nTip Pattern: Full\nFilter Tips: Not recommended\nTip Size: Use larger volume tip if possible"
                )
            ),
            LiquidClass(
                name="Aqueous-Viscous",
                description="For moderately viscous aqueous solutions",
                p_speed=ParameterSettings(
                    label="Medium",
                    value="50-100 µL/s",
                    venus_settings="Aspirate Speed: 50-100 µL/s\nDelay Aspirate: 300-500 ms\nMixing Cycles: 2-3"
                ),
                d_speed=ParameterSettings(
                    label="Medium",
                    value="50-100 µL/s",
                    venus_settings="Dispense Speed: 50-100 µL/s\nDelay Dispense: 300-500 ms\nEmpty Speed: 100-150 µL/s"
                ),
                air_gap=ParameterSettings(
                    label="Small",
                    value="5-10 µL",
                    venus_settings="Pre-Aspirate Air Gap: 0-5 µL\nPost-Aspirate Air Gap: 5-10 µL\nEmpty Air Gap: 0 µL"
                ),
                blowout=ParameterSettings(
                    label="Extended",
                    value="Enhanced",
                    venus_settings="Blowout Volume: 15-25 µL\nBlowout Speed: 100-150 µL/s\nChannel Pattern: All enabled\nExtend Blowout Time: Yes"
                ),
                z_offset=ParameterSettings(
                    label="Medium",
                    value="0.5-1.0 mm",
                    venus_settings="Aspiration Immersion Depth: 0.5-1.0 mm\nDispense Immersion Depth: 0.5-1.0 mm\nBottom Report Offset: 0 mm"
                ),
                tips=ParameterSettings(
                    label="Standard",
                    value="Standard or Wide Bore",
                    venus_settings="Tip Type: Standard or Wide Bore\nTip Pattern: Full\nFilter Tips: Optional\nTip Size: Match to volume"
                )
            ),
            LiquidClass(
                name="Serum",
                description="For serum and protein-rich solutions",
                p_speed=ParameterSettings(
                    label="Medium",
                    value="50-100 µL/s",
                    venus_settings="Aspirate Speed: 50-100 µL/s\nDelay Aspirate: 200-400 ms\nMixing Cycles: 3-5"
                ),
                d_speed=ParameterSettings(
                    label="Medium",
                    value="50-100 µL/s",
                    venus_settings="Dispense Speed: 50-100 µL/s\nDelay Dispense: 200-400 ms\nEmpty Speed: 100-200 µL/s"
                ),
                air_gap=ParameterSettings(
                    label="Medium",
                    value="10-15 µL",
                    venus_settings="Pre-Aspirate Air Gap: 5 µL\nPost-Aspirate Air Gap: 5-10 µL\nEmpty Air Gap: 0 µL"
                ),
                blowout=ParameterSettings(
                    label="Required",
                    value="Enhanced",
                    venus_settings="Blowout Volume: 15-20 µL\nBlowout Speed: 100-150 µL/s\nChannel Pattern: All enabled\nTip Touch: Enabled"
                ),
                z_offset=ParameterSettings(
                    label="Medium",
                    value="0.5-1.0 mm",
                    venus_settings="Aspiration Immersion Depth: 0.5-1.0 mm\nDispense Immersion Depth: 0.5-1.0 mm\nBottom Report Offset: 0 mm"
                ),
                tips=ParameterSettings(
                    label="Low Retention",
                    value="Low Retention",
                    venus_settings="Tip Type: Low Retention\nTip Pattern: Full\nFilter Tips: Recommended\nTip Touch Mode: Side wall"
                )
            ),
            LiquidClass(
                name="Aqueous-Buffer",
                description="For common laboratory buffers",
                p_speed=ParameterSettings(
                    label="Standard",
                    value="100-200 µL/s",
                    venus_settings="Aspirate Speed: 100-200 µL/s\nDelay Aspirate: 50-100 ms\nMixing Cycles: 3-5"
                ),
                d_speed=ParameterSettings(
                    label="Standard",
                    value="100-200 µL/s",
                    venus_settings="Dispense Speed: 100-200 µL/s\nDelay Dispense: 50-100 ms\nEmpty Speed: 200-300 µL/s"
                ),
                air_gap=ParameterSettings(
                    label="Small",
                    value="5-10 µL",
                    venus_settings="Pre-Aspirate Air Gap: 0-5 µL\nPost-Aspirate Air Gap: 5 µL\nEmpty Air Gap: 0 µL"
                ),
                blowout=ParameterSettings(
                    label="Required",
                    value="Standard",
                    venus_settings="Blowout Volume: 10-15 µL\nBlowout Speed: 150-250 µL/s\nChannel Pattern: All enabled"
                ),
                z_offset=ParameterSettings(
                    label="Standard",
                    value="0.5-1.0 mm",
                    venus_settings="Aspiration Immersion Depth: 0.5-1.0 mm\nDispense Immersion Depth: 0.5-1.0 mm\nBottom Report Offset: 0 mm"
                ),
                tips=ParameterSettings(
                    label="Standard",
                    value="Standard",
                    venus_settings="Tip Type: Standard\nTip Pattern: Full\nFilter Tips: Optional for sterile applications"
                )
            ),
            LiquidClass(
                name="Aqueous-Organic",
                description="For water-organic mixtures",
                p_speed=ParameterSettings(
                    label="Medium",
                    value="75-150 µL/s",
                    venus_settings="Aspirate Speed: 75-150 µL/s\nDelay Aspirate: 100-200 ms\nMixing Cycles: 3-4"
                ),
                d_speed=ParameterSettings(
                    label="Medium",
                    value="75-150 µL/s",
                    venus_settings="Dispense Speed: 75-150 µL/s\nDelay Dispense: 100-200 ms\nEmpty Speed: 150-250 µL/s"
                ),
                air_gap=ParameterSettings(
                    label="Medium",
                    value="10-15 µL",
                    venus_settings="Pre-Aspirate Air Gap: 5 µL\nPost-Aspirate Air Gap: 5-10 µL\nEmpty Air Gap: 0 µL"
                ),
                blowout=ParameterSettings(
                    label="Required",
                    value="Enhanced",
                    venus_settings="Blowout Volume: 10-20 µL\nBlowout Speed: 150-200 µL/s\nChannel Pattern: All enabled"
                ),
                z_offset=ParameterSettings(
                    label="Low",
                    value="0.3-0.8 mm",
                    venus_settings="Aspiration Immersion Depth: 0.3-0.8 mm\nDispense Immersion Depth: 0.3-0.8 mm\nBottom Report Offset: 0.1 mm"
                ),
                tips=ParameterSettings(
                    label="Conductive",
                    value="Conductive",
                    venus_settings="Tip Type: Conductive\nTip Pattern: Full\nFilter Tips: Recommended\nEnable Tip Touch: Yes"
                )
            )
        ]
    
    def get_liquids_by_class(self, liquid_class: Optional[str] = None) -> List[Liquid]:
        """Get liquids filtered by liquid class."""
        if liquid_class:
            return [liquid for liquid in self.liquids_data if liquid.liquid_class == liquid_class]
        return self.liquids_data
    
    def get_liquid_class_by_name(self, name: str) -> Optional[LiquidClass]:
        """Get a liquid class by name."""
        for liquid_class in self.liquid_classes:
            if liquid_class.name == name:
                return liquid_class
        return None
    
    def get_all_liquid_class_names(self) -> List[str]:
        """Get all liquid class names."""
        return [liquid_class.name for liquid_class in self.liquid_classes] 