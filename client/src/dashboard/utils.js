export const getDataForLastDay = (totalExpense) => {
    const twentyFourHoursAgo = new Date();
    twentyFourHoursAgo.setDate(twentyFourHoursAgo.getDate() - 1); 
    const yesterdayDateString = twentyFourHoursAgo.toLocaleDateString(); 
    const aggregatedExpenses = {};
    totalExpense?.forEach(ele => {
        const eleDate = new Date(ele.date);
        const eleDateString = eleDate.toLocaleDateString();
        
        if (eleDateString === yesterdayDateString) {
            const category = ele.category;
            const amount = parseFloat(ele.expense);
            if (aggregatedExpenses[category]) {
                aggregatedExpenses[category] += amount;
            } else {
                aggregatedExpenses[category] = amount;
            }
        }
    });
    const aggregatedData = Object.entries(aggregatedExpenses).map(([category, expense]) => ({ category, expense }));
    return aggregatedData;
};


export const getDataForLastSevenDays = (totalExpense) => {
    const today = new Date();
    const yesterday = today.setDate(today.getDate() - 1);
    const sevenDaysAgo = new Date(today.getTime() - 7* 24 * 60 * 60 * 1000);
    const aggregatedExpenses = {};
    totalExpense?.forEach(ele => {
        const eleDate = new Date(ele.date);
        
        // Check if the expense date is within the last seven days
        if (eleDate >= sevenDaysAgo && eleDate <yesterday) {
            const date = eleDate.toLocaleDateString(); // Get the date in string format
            const amount = parseFloat(ele.expense);
            
            // Aggregate expenses by date
            if (aggregatedExpenses[date]) {
                aggregatedExpenses[date] += amount;
            } else {
                aggregatedExpenses[date] = amount;
            }
        }
    });

    // Convert aggregated expenses object to an array of objects
    const aggregatedData = [];
    for (const date in aggregatedExpenses) {
        aggregatedData.push({ date, expense: aggregatedExpenses[date] });
    }
    aggregatedData.sort((a, b) => new Date(a.date) - new Date(b.date));
    return aggregatedData;
};

export const getDataForToday = (totalExpense) => {
    const today = new Date();
    const todayDateString = today.toLocaleDateString(); 
    const aggregatedExpenses = {};

    totalExpense?.forEach(ele => {
        const eleDate = new Date(ele.date);
        const eleDateString = eleDate.toLocaleDateString();
        
        if (eleDateString === todayDateString) {
            const category = ele.category;
            const amount = parseFloat(ele.expense);
            console.log(ele)
            if (aggregatedExpenses[category]) {
                aggregatedExpenses[category] += amount;
            } else {
                aggregatedExpenses[category] = amount;
            }
            console.log(aggregatedExpenses)
        }
    });

    const aggregatedData = Object.entries(aggregatedExpenses).map(([category, expense]) => ({ category, expense }));
    return aggregatedData;
};