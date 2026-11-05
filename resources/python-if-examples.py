# DevFoundy: Python if statement examples
# Run one example at a time. Running this file runs all 12 in order.
# Numeric input must be valid numeric text.

# 1. Positive or not
# Zero is not positive. Use > rather than >=.
number = int(input("Enter a number: "))
if number > 0:
    print("The number is positive.")
else:
    print("The number is not positive.")

# 2. Pass or fail
# Validate the range first, then check the pass mark. These examples use a pass mark of 50.
grade = int(input("Enter your grade: "))
if grade < 0 or grade > 100:
    print("Invalid grade. Enter 0 to 100.")
elif grade >= 50:
    print("You passed the class.")
else:
    print("You failed the class.")

# 3. Even or odd
# % gives the remainder. An integer is even when dividing by 2 leaves no remainder.
number = int(input("Enter a number: "))
if number % 2 == 0:
    print("The number is even.")
else:
    print("The number is odd.")

# 4. Adult or child
# For this exercise, adult means age 18 or above. Reject negative ages first.
age = int(input("Enter your age: "))
if age < 0:
    print("Invalid age.")
elif age >= 18:
    print("You are an adult.")
else:
    print("You are a child.")

# 5. Larger of two numbers
# After checking both greater-than cases, the only remaining possibility is equality.
num1 = int(input("Enter the first number: "))
num2 = int(input("Enter the second number: "))
if num1 > num2:
    print("The larger number is", num1)
elif num2 > num1:
    print("The larger number is", num2)
else:
    print("The numbers are equal.")

# 6. Numerical grade to letter grade
# Check from highest to lowest. Earlier branches have already ruled out higher grades. This is a practice scale, not official Cambridge grade boundaries.
grade = int(input("Enter your grade: "))
if not 0 <= grade <= 100:
    print("Invalid grade. Enter 0 to 100.")
elif grade >= 90:
    print("You got an A.")
elif grade >= 80:
    print("You got a B.")
elif grade >= 70:
    print("You got a C.")
elif grade >= 60:
    print("You got a D.")
else:
    print("You got an F.")

# 7. Hot, warm, or cold
# With these chosen thresholds, 30°C is warm and 20°C is cold. float() also accepts decimal temperatures.
temperature = float(input("Temperature in Celsius: "))
if temperature > 30:
    print("It is hot.")
elif temperature > 20:
    print("It is warm.")
else:
    print("It is cold.")

# 8. Compare two strings
# This keeps the username/password comparison as a string exercise. Equality is case-sensitive. It does not authenticate a user; use made-up values, not a real password.
username = input("Enter a practice username: ")
password = input("Enter a practice password: ")
if username == password:
    print("The strings match.")
else:
    print("The strings do not match.")

# 9. Leap year
# For Gregorian calendar years: divisible by 400, or divisible by 4 but not by 100. 2000 is a leap year; 1900 is not.
year = int(input("Enter a year: "))
if year <= 0:
    print("Enter a positive year.")
elif year % 400 == 0 or (year % 4 == 0 and year % 100 != 0):
    print("This is a leap year.")
else:
    print("This is not a leap year.")

# 10. Simple calculator
# Check the operator and guard both division operations against zero. / divides; // performs floor division (rounds down, so -5 // 2 is -3).
number1 = float(input("First number: "))
number2 = float(input("Second number: "))
operator = input("Operator (+, -, *, /, //): ").strip()
if operator not in ("+", "-", "*", "/", "//"):
    print("Invalid operator.")
elif operator in ("/", "//") and number2 == 0:
    print("Cannot divide by zero.")
elif operator == "+":
    print(number1 + number2)
elif operator == "-":
    print(number1 - number2)
elif operator == "*":
    print(number1 * number2)
elif operator == "/":
    print(number1 / number2)
else:
    print(number1 // number2)

# 11. Apply a 10% discount
# Over 1000 means strictly greater than 1000. An amount of exactly 1000 gets no discount.
amount = float(input("Purchase amount: "))
if amount < 0:
    print("Invalid amount.")
elif amount > 1000:
    print("Total:", round(amount * 0.9, 2))
else:
    print("No discount. Total:", amount)

# 12. Largest of three numbers
# Using >= handles tied largest values too: 5, 5, 2 correctly gives 5. Strict > checks alone miss this case.
n1 = int(input("First number: "))
n2 = int(input("Second number: "))
n3 = int(input("Third number: "))
if n1 == n2 == n3:
    print("All numbers are equal:", n1)
elif n1 >= n2 and n1 >= n3:
    print("The largest number is", n1)
elif n2 >= n1 and n2 >= n3:
    print("The largest number is", n2)
else:
    print("The largest number is", n3)
