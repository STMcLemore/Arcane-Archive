
export function filterSpells(spells, selectedClass, selectedLevel) {
    return spells.filter(spell => {
        const classMatch = !selectedClass || spell.url.includes(selectedClass);

        const levelMatch = !selectedLevel || spell.level === selectedLevel;

        return classMatch && levelMatch;
    });
}