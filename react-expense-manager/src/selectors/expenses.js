// @@@@@@@@@@@Selectors
// Get Filtered Expenses
// timestamp in milliseconds, timezone independent, unix epoch, jan 01 1970
const getFiltered = (expenses, { text, sortBy, startDate, endDate }) => {
    return expenses.filter((exp) => {
        // returns true for match, match means shown on the filteredNotes=getFilteredNotes()
        const textMatch = exp.description.toLowerCase().includes(text) || exp.note.toLowerCase().includes(text)
        const startDateMatch = typeof startDate !== 'number' || exp.createdAt >= startDate
        const endDateMatch = typeof endDate !== 'number' || exp.createdAt <= endDate

        return textMatch && startDateMatch && endDateMatch
    }).sort((a, b) => {
        if (sortBy === 'date') {
            return a.createdAt > b.createdAt ? -1 : 1
        } else if (sortBy === 'amount') {
            return a.amount > b.amount ? -1 : 1
        } else {
            return 0
        }
    })
}

export default getFiltered