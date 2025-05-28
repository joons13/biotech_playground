// Application state
let currentLiquidClass = null;
let currentSelectedParam = null;

// DOM elements
const liquidClassSelect = document.getElementById('liquidClassSelect');
const liquidClassDetails = document.getElementById('liquidClassDetails');
const classTitle = document.getElementById('classTitle');
const classDescription = document.getElementById('classDescription');
const parameterDetails = document.getElementById('parameterDetails');
const parameterTitle = document.getElementById('parameterTitle');
const venusSettings = document.getElementById('venusSettings');
const liquidsTableBody = document.getElementById('liquidsTableBody');

// Parameter info elements
const pSpeedInfo = document.getElementById('pSpeedInfo');
const dSpeedInfo = document.getElementById('dSpeedInfo');
const airGapInfo = document.getElementById('airGapInfo');
const blowoutInfo = document.getElementById('blowoutInfo');
const zOffsetInfo = document.getElementById('zOffsetInfo');
const tipsInfo = document.getElementById('tipsInfo');

// Parameter cards
const parameterCards = document.querySelectorAll('.parameter-card');

// Event listeners
document.addEventListener('DOMContentLoaded', function() {
    initializeEventListeners();
});

function initializeEventListeners() {
    // Liquid class select change handler
    liquidClassSelect.addEventListener('change', handleLiquidClassChange);
    
    // Parameter card click handlers
    parameterCards.forEach(card => {
        card.addEventListener('click', function() {
            const param = this.getAttribute('data-param');
            handleParameterClick(param);
        });
        
        // Add keyboard accessibility
        card.setAttribute('tabindex', '0');
        card.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                const param = this.getAttribute('data-param');
                handleParameterClick(param);
            }
        });
    });
}

async function handleLiquidClassChange(event) {
    const selectedClass = event.target.value;
    
    if (!selectedClass) {
        // Hide liquid class details and show all liquids
        liquidClassDetails.style.display = 'none';
        await loadLiquids();
        return;
    }
    
    try {
        // Load liquid class details
        await loadLiquidClassDetails(selectedClass);
        
        // Load filtered liquids
        await loadLiquids(selectedClass);
        
        // Show liquid class details
        liquidClassDetails.style.display = 'block';
        
        // Reset parameter selection
        currentSelectedParam = null;
        parameterDetails.style.display = 'none';
        
    } catch (error) {
        console.error('Error loading liquid class:', error);
        showError('Failed to load liquid class details');
    }
}

async function loadLiquidClassDetails(className) {
    try {
        const response = await fetch(`/api/liquid-class/${encodeURIComponent(className)}`);
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const liquidClass = await response.json();
        currentLiquidClass = liquidClass;
        
        // Update UI with liquid class details
        classTitle.textContent = `${liquidClass.name} Settings`;
        classDescription.textContent = liquidClass.description;
        
        // Update parameter info
        pSpeedInfo.textContent = `${liquidClass.p_speed.label} (${liquidClass.p_speed.value})`;
        dSpeedInfo.textContent = `${liquidClass.d_speed.label} (${liquidClass.d_speed.value})`;
        airGapInfo.textContent = `${liquidClass.air_gap.label} (${liquidClass.air_gap.value})`;
        blowoutInfo.textContent = `${liquidClass.blowout.label} (${liquidClass.blowout.value})`;
        zOffsetInfo.textContent = `${liquidClass.z_offset.label} (${liquidClass.z_offset.value})`;
        tipsInfo.textContent = `${liquidClass.tips.label} (${liquidClass.tips.value})`;
        
    } catch (error) {
        console.error('Error loading liquid class details:', error);
        throw error;
    }
}

async function loadLiquids(liquidClass = null) {
    try {
        let url = '/api/liquids';
        if (liquidClass) {
            url += `?liquid_class=${encodeURIComponent(liquidClass)}`;
        }
        
        const response = await fetch(url);
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const liquids = await response.json();
        
        // Update table
        updateLiquidsTable(liquids);
        
    } catch (error) {
        console.error('Error loading liquids:', error);
        showError('Failed to load liquids data');
    }
}

function updateLiquidsTable(liquids) {
    // Clear existing rows
    liquidsTableBody.innerHTML = '';
    
    // Add new rows
    liquids.forEach((liquid, index) => {
        const row = document.createElement('tr');
        row.className = 'liquid-row';
        
        row.innerHTML = `
            <td>${escapeHtml(liquid.name)}</td>
            <td>${liquid.density}</td>
            <td>${liquid.viscosity}</td>
            <td>${escapeHtml(liquid.molar_weight)}</td>
            <td>${escapeHtml(liquid.liquid_class)}</td>
            <td>${escapeHtml(liquid.notes)}</td>
        `;
        
        liquidsTableBody.appendChild(row);
    });
}

function handleParameterClick(param) {
    if (!currentLiquidClass) {
        return;
    }
    
    currentSelectedParam = param;
    
    // Get parameter details
    const paramData = currentLiquidClass[param];
    if (!paramData) {
        return;
    }
    
    // Update parameter details display
    const paramDisplayName = getParameterDisplayName(param);
    parameterTitle.textContent = `Venus Parameter Details: ${paramDisplayName}`;
    venusSettings.textContent = paramData.venus_settings;
    
    // Show parameter details
    parameterDetails.style.display = 'block';
    
    // Scroll to parameter details
    parameterDetails.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

function getParameterDisplayName(param) {
    const displayNames = {
        'p_speed': 'Pipetting Speed',
        'd_speed': 'Dispensing Speed',
        'air_gap': 'Air Gap',
        'blowout': 'Blowout',
        'z_offset': 'Z-Offset',
        'tips': 'Tips'
    };
    
    return displayNames[param] || param;
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

function showError(message) {
    // Simple error display - could be enhanced with a proper notification system
    console.error(message);
    alert(message);
}

// Utility function to format parameter names
function formatParameterName(param) {
    return param.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());
} 