class Reverse_String(object):
    def reverseString(self, s):
        # """
        # :type s: List[str]
        # :rtype: None Do not return anything, modify s in-place instead.
        # """

        left = 0
        right = len(s) - 1 
        
        while left < right:

            s[left], s[right] = s[right], s[left] 
            # assign the left to the right

            left = left + 1 
            right = right - 1 
            # could be += 1 or +-1'

            if left == right:
                return s 

