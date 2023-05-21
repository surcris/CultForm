export const data = {
    labels: [
        'Dark',
        'Air',
        'Terre',
        'Light',
        'Eau',
        'Feu',
        
        
    ],
    datasets: [
        {
            label: 'My First dataset',
            backgroundColor: 'rgba(179,181,198,0.2)',
            borderColor: 'rgba(179,181,198,1)',
            pointBackgroundColor: 'rgba(179,181,198,1)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgba(179,181,198,1)',
            data: [65, 59, 90, 81, 56, 55]
        },
        
    ]
}

export const options = {
    responsive: true,
    tooltips: false,
    scales: {
        r: {
            ticks: {
                display: false, // Enlever les valeurs
            },
            suggestedMin: 0, // Valeur minimale suggérée
            suggestedMax: 100 // Valeur maximale suggérée
        }
    },
    plugins: {
        datalabels: {
            formatter: function(value, context) {
                return "hello";
            }
        }
    }
}
