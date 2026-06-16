function updateMacroUI(macros) {
    // 1. Update widths dynamically using percentages
    document.getElementById('bar-protein').style.width = `${macros.proteins}%`;
    document.getElementById('bar-carbs').style.width = `${macros.carbs}%`;
    document.getElementById('bar-fats').style.width = `${macros.fats}%`;
    document.getElementById('bar-fibers').style.width = `${macros.fibers}%`;

    // 2. Update the numeric text indicators
    document.getElementById('protein-text').textContent = `${macros.proteins}%`;
    document.getElementById('carbs-text').textContent = `${macros.carbs}%`;
    document.getElementById('fats-text').textContent = `${macros.fats}%`;
    document.getElementById('fibers-text').textContent = `${macros.fibers}%`;
}