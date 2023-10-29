import openai
import copy
from datetime import datetime, timedelta


def generate_subtasks(task_data, num_subtasks=3):
    # Initialize the OpenAI API key
    openai.api_key = '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'  # Replace with your OpenAI API key

    # Define a comprehensive prompt
    prompt = f"Generate subtasks for the following task if you think necessary and estimate a score ranking harder tasks higher 0-100:\n" \
             f"Name: {task_data['name']}\n" \
             f"Urgency: {task_data['urgency']}\n" \
             f"Importance: {task_data['importance']}\n" \
             f"Fun Factor: {task_data['fun_factor']}\n" \
             f"Score: {task_data['score']}\n" \
             f"Duration: {task_data['duration']} minutes\n" \
             f"Deadline: {task_data['deadline']}\n" \
             f"Dependency: {task_data['dependency']}\n" \
             f"Creation Date: {task_data['creation_date']}\n" \
             f"Status: {task_data['status']}\n" \
             f"Delayed Int: {task_data['delayed_int']}\n" \
             f"Task Type: {task_data['task_type']}\n"

    # Generate subtasks using GPT-3
    responses = openai.Completion.create(
        engine="text-davinci-002",  # You can specify the desired engine
        prompt=prompt,
        max_tokens=50,  # Adjust to control response length
        n=num_subtasks,  # Number of subtasks to generate
        stop=None,  # Optional stop words to indicate the end of subtasks
        temperature=0.7  # Adjust for randomness (0.2 for more deterministic, 1.0 for more random)
    )

    subtask_list = []
    base_creation_date = datetime.strptime(task_data['creation_date'], '%Y-%m-%d_%H:%M')
    for i, response in enumerate(responses.choices):
        # Copy the base task and modify it
        subtask = copy.deepcopy(task_data)

        # Modify the subtask name based on the response
        subtask['name'] = response.text.strip()

        # Adjust the creation date for subtasks (e.g., increase by one day for each subtask)
        subtask['creation_date'] = (base_creation_date + timedelta(days=i)).strftime('%Y-%m-%d_%H:%M')

        # Append the subtask to the list
        subtask_list.append(subtask)

    return subtask_list
