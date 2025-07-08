class Solution(object):
    def isValid(self, s):
        """
        :type s: str
        :rtype: bool
        """
        new_dict = {'(' : ')', '{' : '}', '[' : ']'}

        new_stack = []
        for i in s: 
            if i in new_dict: 
                new_stack.append(i)
            else: 
                if len(new_stack) == 0:
                    return False
                recent_open_bracket = new_stack.pop()
                if new_dict[recent_open_bracket] != i:
                    return False
        
        return not new_stack 
            

    


        