# DevFoundy：Pythonのif文の例
# 例を一つずつ実行してください。このファイル全体を実行すると、12の例が順番に動きます。
# 数字を求められたら、有効な数字を入力してください。

# 1. 正の数かどうか
# ゼロは正の数ではありません。>= ではなく > を使います。
number = int(input("数字を入力してください: "))
if number > 0:
    print("正の数です。")
else:
    print("正の数ではありません。")

# 2. 合格か不合格か
# まず点数が0～100の範囲か確認し、その後で合格点を調べます。この例の合格点は50点です。
grade = int(input("点数を入力してください: "))
if grade < 0 or grade > 100:
    print("無効な点数です。0から100まで入力してください。")
elif grade >= 50:
    print("合格です。")
else:
    print("不合格です。")

# 3. 偶数か奇数か
# % は余りを返します。2で割った余りが0なら偶数です。
number = int(input("数字を入力してください: "))
if number % 2 == 0:
    print("偶数です。")
else:
    print("奇数です。")

# 4. 大人か子どもか
# この練習では18歳以上を大人とします。まず負の年齢を除外します。
age = int(input("年齢を入力してください: "))
if age < 0:
    print("無効な年齢です。")
elif age >= 18:
    print("大人です。")
else:
    print("子どもです。")

# 5. 二つの数字の大きい方
# どちらが大きいかを両方調べ、残った場合は同じ数字です。
num1 = int(input("最初の数字を入力してください: "))
num2 = int(input("二つ目の数字を入力してください: "))
if num1 > num2:
    print("大きい数字は", num1)
elif num2 > num1:
    print("大きい数字は", num2)
else:
    print("二つの数字は同じです。")

# 6. 点数をA～Fの評価に変える
# 高い評価から順に調べます。これは練習用の基準で、公式の成績境界ではありません。
grade = int(input("点数を入力してください: "))
if not 0 <= grade <= 100:
    print("無効な点数です。0から100まで入力してください。")
elif grade >= 90:
    print("評価はAです。")
elif grade >= 80:
    print("評価はBです。")
elif grade >= 70:
    print("評価はCです。")
elif grade >= 60:
    print("評価はDです。")
else:
    print("評価はFです。")

# 7. 暑い・暖かい・寒い
# この境界では30℃は「暖かい」、20℃は「寒い」です。float() は小数も受け取れます。
temperature = float(input("気温（摂氏）を入力してください: "))
if temperature > 30:
    print("暑いです。")
elif temperature > 20:
    print("暖かいです。")
else:
    print("寒いです。")

# 8. 二つの文字列を比べる
# 文字列の比較を練習します。大文字と小文字は区別されます。実際の認証ではないので、架空の値を使ってください。
username = input("練習用のユーザー名を入力してください: ")
password = input("練習用のパスワードを入力してください: ")
if username == password:
    print("文字列が一致しました。")
else:
    print("文字列が一致しません。")

# 9. うるう年
# 西暦では、400で割り切れる年、または4で割り切れて100で割り切れない年がうるう年です。
year = int(input("年を入力してください: "))
if year <= 0:
    print("正の年を入力してください。")
elif year % 400 == 0 or (year % 4 == 0 and year % 100 != 0):
    print("うるう年です。")
else:
    print("うるう年ではありません。")

# 10. 簡単な電卓
# 演算子を確認し、ゼロで割る処理を防ぎます。/ は通常の割り算、// は切り下げ除算です。
number1 = float(input("最初の数字: "))
number2 = float(input("二つ目の数字: "))
operator = input("演算子 (+, -, *, /, //): ").strip()
if operator not in ("+", "-", "*", "/", "//"):
    print("無効な演算子です。")
elif operator in ("/", "//") and number2 == 0:
    print("ゼロで割ることはできません。")
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

# 11. 10％割引を適用する
# 「1000より大きい」場合だけ割引します。ちょうど1000には割引しません。
amount = float(input("購入金額: "))
if amount < 0:
    print("無効な金額です。")
elif amount > 1000:
    print("合計:", round(amount * 0.9, 2))
else:
    print("割引なし。合計:", amount)

# 12. 三つの数字の最大値
# >= なら同点の最大値も扱えます。5、5、2の場合も正しく5になります。
n1 = int(input("最初の数字: "))
n2 = int(input("二つ目の数字: "))
n3 = int(input("三つ目の数字: "))
if n1 == n2 == n3:
    print("すべて同じ数字です:", n1)
elif n1 >= n2 and n1 >= n3:
    print("最大の数字は", n1)
elif n2 >= n1 and n2 >= n3:
    print("最大の数字は", n2)
else:
    print("最大の数字は", n3)
