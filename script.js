document.addEventListener('DOMContentLoaded', () => {
    const startButton = document.getElementById('startButton');
    const step1 = document.getElementById('step1');
    const step2 = document.getElementById('step2');
    const step3 = document.getElementById('step3');
    const step4 = document.getElementById('step4');
    const step5 = document.getElementById('step5');
    const step6 = document.getElementById('step6');
    const specificQuestion = document.getElementById('specific-question');
    const specificOptions = document.getElementById('specific-options');
    const restartButton = document.getElementById('restart-button');

    let userChoices = {
        step2: '',
        step3: '',
        step4: '',
        step5: ''
    };

    const topicOptions = {
        'Technology': ['Data Science & Analytics', 'Information Technology', 'AI / ML', 'Computer Science'],
        'History': ['Ancient History', 'Medieval History', 'Modern History', 'World War History'],
        'Science': ['Physics', 'Chemistry', 'Biology', 'Astronomy'],
        'Self-help': ['Personal Development', 'Productivity', 'Mindfulness', 'Financial Management'],
        'Genre A': ['A1', 'A2', 'A3', 'A4'],
        'Genre B': ['B1', 'B2', 'B3', 'B4'],
        'Genre C': ['C1', 'C2', 'C3', 'C4'],
        'Genre D': ['D1', 'D2', 'D3', 'D4']
    };

    const recommendations = [
        {
            step2: 'Technology',
            step3: 'Data Science & Analytics',
            step4: 'Beginner',
            step5: 'Appetiser',
            titles: ['Data Science: The Executive Summary by Field Cady']
        },
        {
            step2: 'Technology',
            step3: 'AI / ML',
            step4: 'Intermediate',
            step5: 'Main',
            titles: ['Artificial Intelligence: A Modern Approach by Stuart Russell and Peter Norvig', 
                     'Machine Learning: A Probabilistic Perspective by Kevin P. Murphy']
        },
        // Add more recommendation objects as needed
    ];

    startButton.addEventListener('click', () => {
        startButton.classList.remove('grey-button');
        startButton.classList.add('red-button');
        setTimeout(() => {
            step1.classList.add('hidden');
            step2.classList.remove('hidden');
        }, 300);
    });

    function handleButtonClick(event) {
        const clickedButton = event.target;
        const parentStep = clickedButton.closest('.step');

        if (parentStep.id === 'step2') {
            userChoices.step2 = clickedButton.textContent;
            const selectedTopic = clickedButton.textContent;
            if (topicOptions[selectedTopic]) {
                const questionHTML = `What specific area of ${selectedTopic}<br>are you interested in?`;
                specificQuestion.innerHTML = questionHTML;
                specificOptions.innerHTML = '';
                topicOptions[selectedTopic].forEach(option => {
                    const button = document.createElement('button');
                    button.className = 'option-button';
                    button.textContent = option;
                    button.addEventListener('click', handleButtonClick);
                    specificOptions.appendChild(button);
                });
                setTimeout(() => {
                    step2.classList.add('hidden');
                    step3.classList.remove('hidden');
                }, 300);
            } else {
                alert('You selected: ' + selectedTopic + '. This option is not implemented yet.');
            }
        } else if (parentStep.id === 'step3') {
            userChoices.step3 = clickedButton.textContent;
            setTimeout(() => {
                step3.classList.add('hidden');
                step4.classList.remove('hidden');
            }, 300);
        } else if (parentStep.id === 'step4') {
            userChoices.step4 = clickedButton.textContent;
            setTimeout(() => {
                step4.classList.add('hidden');
                step5.classList.remove('hidden');
            }, 300);
        } else if (parentStep.id === 'step5') {
            userChoices.step5 = clickedButton.textContent;
            setTimeout(() => {
                step5.classList.add('hidden');
                showRecommendations();
            }, 300);
        }

        parentStep.querySelectorAll('.option-button').forEach(btn => btn.classList.remove('selected'));
        clickedButton.classList.add('selected');
    }

	function showRecommendations() {
		const step6 = document.getElementById('step6');
		const recommendationList = document.getElementById('recommendation-list');
		
		const matchingRecommendations = recommendations.filter(rec => 
			rec.step2 === userChoices.step2 &&
			rec.step3 === userChoices.step3 &&
			rec.step4 === userChoices.step4 &&
			rec.step5 === userChoices.step5
		);

		recommendationList.innerHTML = '';

		if (matchingRecommendations.length > 0) {
			matchingRecommendations.forEach(rec => {
				rec.titles.forEach(title => {
					const li = document.createElement('li');
					li.textContent = title;
					recommendationList.appendChild(li);
				});
			});
		} else {
			const li = document.createElement('li');
			li.textContent = 'Based on your choices, we don\'t have specific recommendations. Please try different options.';
			recommendationList.appendChild(li);
		}

		step6.classList.remove('hidden');
	}

    restartButton.addEventListener('click', () => {
        userChoices = {
            step2: '',
            step3: '',
            step4: '',
            step5: ''
        };
        document.querySelectorAll('.step').forEach(step => step.classList.add('hidden'));
        step1.classList.remove('hidden');
        startButton.classList.remove('red-button');
        startButton.classList.add('grey-button');
    });

    // Add listeners to initial buttons
    document.querySelectorAll('.option-button').forEach(button => {
        button.addEventListener('click', handleButtonClick);
    });
});