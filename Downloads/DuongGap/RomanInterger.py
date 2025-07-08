class Solution(object):
    def romanToInt(self, s):
        """
        :type s: str
        :rtype: int
        """

        new_dict = {'I' : 1, 'V' : 5, 'X' : 10, 'L' : 50, 'C' : 100, 'D' : 500, 'M' : 1000}
        total = 0
        for i in range(len(s)):
            # if i in new_dict:
                # total += new_dict[i]
            if i < len(s) - 1 and new_dict[s[i]] < new_dict[s[i+1]]:
                total -= new_dict[s[i]]
            else:
                total += new_dict[s[i]]
        return total 
        