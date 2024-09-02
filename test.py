def make_welcome_massage(user):
    return user['name'] + '様ようこそ！'

user1 = {'user_id': 1, 'name': '山田太郎', 'status': 'basic'}
user2 = {'user_id': 2, 'name': '佐藤花子', 'status': 'premium'}
user3 = {'user_id': 3, 'name': '鈴木次郎', 'status': 'premium'}

users = [user1, user2, user3]

for user in users:
    welcome_message = make_welcome_massage(user)
    print(welcome_message)


# printのみで実行する場合
for user in users:
    print(user['name'] + '様ようこそ！')

