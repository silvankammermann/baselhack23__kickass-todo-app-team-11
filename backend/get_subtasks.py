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
             f"Creation Date: {task_data['creation_date']}\n" \
             f"Status: {task_data['status']}\n" \
 \
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
    for i, response in enumerate(responses.choices):
        # Copy the base task and modify it
        subtask = copy.deepcopy(task_data)

        # Modify the subtask name based on the response
        subtask['name'] = response.text.strip()

        # Adjust the creation date for subtasks (e.g., increase by one day for each subtask)

        # Append the subtask to the list
        subtask_list.append(subtask)

    return subtask_list


def makes_sense_to_divide_task(task_name):
    # Define the prompt for GPT-3 to evaluate whether to divide the task.
    prompt = f"Given the task: '{task_name}', should it be divided into subtasks? Please provide a recommendation." \
             f"It should only divided into subtasks if you estimate that the duration takes longer than 2 hours."

    # Set up your OpenAI API key.
    api_key = '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'

    # Make the API request to GPT-3.
    response = openai.Completion.create(
        engine="davinci",
        prompt=prompt,
        max_tokens=5,  # You can adjust the maximum token limit as needed.
        api_key=api_key
    )

    # Extract the model's response.
    model_response = response.choices[0].text

    # Analyze the response and determine if it makes sense to divide the task.
    if "yes" in model_response.lower():
        return True
    else:
        return False
