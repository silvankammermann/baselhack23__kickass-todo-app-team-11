# logic checking data types 

def check_new_task(task):
    task_clean = {
        'name': str(task['name']),
        'urgency': int(task['urgency']), 
        'importance': int(task['importance']), 
        'delayed_int': int(0),
        }
    
    return task_clean