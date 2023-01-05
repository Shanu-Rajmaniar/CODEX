#!/usr/bin/env python3

import sys
import subprocess
    
#1 - Path to file, 2 - File Name

a = "g++ -o "+sys.argv[1]+"/"+sys.argv[2]+" "+sys.argv[1]+"/"+sys.argv[2]+".cpp"

result = subprocess.run(a,stdout=subprocess.PIPE,stderr=subprocess.PIPE,universal_newlines=True,shell=True)
if result.stderr=="":
    print("OK",end='')
    sys.stdout.flush();
else:
    print(str(result.stderr),end='')
    sys.stdout.flush();