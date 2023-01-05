import sys
import os
import glob
import subprocess

def autograder(path,problem_name,file_name):

    samp_out=path+"/sample_outputs/"+problem_name+"/"+file_name+".out"
    gen_out=path+"/generated_outputs/"+problem_name+"/"+file_name+".out"
    samp_out1=path+"/sample_outputs/"+problem_name+"/"+file_name+".out~"
    gen_out1=path+"/generated_outputs/"+problem_name+"/"+file_name+".out~"

    f=open(samp_out)
    f1=open(samp_out1,"w")

    for line in f:
        line=(line.strip())+"\n"
        f1.write(line);

    f.close()
    f1.close()

    f=open(gen_out)
    f1=open(gen_out1,"w")

    for line in f:
        line=line.strip()
        if(line==""):
            continue

        line=line+"\n"
        f1.write(line);

    f.close()
    f1.close()

    os.system("rm "+gen_out);
    os.system("rm "+samp_out);

    os.system("mv "+samp_out1+" "+samp_out)
    os.system("mv "+gen_out1+" "+gen_out)

    try:
        (subprocess.check_output("diff "+samp_out+" "+gen_out,stderr=subprocess.STDOUT,shell=True)).__str__()
    except:
        return False
    return True

# 1 - Path to executable 2 - Problem Name (1605C) 3 - Test Case (1605C2) 4 - Path to testcases folder

b = "timeout 5s "+ sys.argv[1]+"/"+sys.argv[2]+" < "+sys.argv[4]+"/sample_inputs/"+sys.argv[2]+"/"+sys.argv[3]+".in" + " > "+sys.argv[4]+"/generated_outputs/"+sys.argv[2]+"/"+sys.argv[3]+".out"

code=os.WEXITSTATUS(os.system(b))

if code == 124:
    print("TLE",end='')
    sys.stdout.flush() 
elif(autograder(sys.argv[4],sys.argv[2],sys.argv[3])):
    print("OK",end='')
    sys.stdout.flush();
else:
    #print("Something went wrong for "+file_name)
    print("WA",end='')
    sys.stdout.flush()