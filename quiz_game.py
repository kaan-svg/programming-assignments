questions=["How many elements are in the periodic table?","Which animal lays the largest eggs?"]
options=[["A.116","B.117","C.118","D.119"],["A.whale","B.crocodile","C.elephant","D.ostrich"]]
answers=["C","D"]
score=0
for i,q in enumerate(questions):
    print(q)
    for opt in options[i]:
        print(opt)
    guess=input("Enter your choice: ").upper()
    if guess==answers[i]:
        score+=1
        print("Correct!")
    else:
        print("Wrong!")
print(f"Score: {score}/{len(questions)}")