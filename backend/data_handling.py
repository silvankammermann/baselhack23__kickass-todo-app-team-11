# logic checking data types 

def check_new_task(task):
    task_clean = {
        'name': str(task['name']),
        'urgency': int(task['urgency']), 
        'importance': int(task['importance']), 
        'creation_date': task['creation_date'], 
        'status': str(task['status']), 
        'delayed_int': int(task['delayed_int']), 
        'task_type': str(task['task_type'])
        }
    
    return task_clean