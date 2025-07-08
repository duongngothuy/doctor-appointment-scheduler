class Solution(object):
    def fizzBuzz(self, n):
        """
        :type n: int
        :rtype: List[str]
        """
        new_list = []
        for i in range(1, n+1):
            if i % 3 == 0 and i % 5 == 0: 
                new_list.append("FizzBuzz")
                # return new_list
            elif i % 3 == 0: 
                new_list.append("Fizz")
                # return new_list
            elif i % 5 == 0: 
                new_list.append("Buzz")
                # return new_list
            else:
                new_list.append(str(i))
                # return new_list
            
        return new_list 




