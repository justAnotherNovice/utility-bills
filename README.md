# utility-bills

This is a simple app to keep track of your utility bills' history. Using this application, you can add utility indicators for the current month for each utility to view the final sum and the amount used.
You can view the utility bill information for the last month, and also remove or change it. With the app, you can view the full history for each utility in two formats: 
1. Text view

   The same information that can be viewed for the last month on the main tab, but you can view it for each month of the selected year, along with the final expenses for the year.
2. Chart view

   Information about expenses for each month is shown on the bar chart. You can tap on the bar of the desired month to view extended information.

Last but not least, you can compare the expenses of two desired years for individual utilities. This functionality is available only in the Char view format. Additionally, while comparing two years, it's possible to see the comparison of the final expenses of these years on the pie chart.

## Installation

1. Clone the repository

   ```bash
   git clone https://github.com/justAnotherNovice/utility-bills.git
   ```

2. Install dependencies

   ```bash
   npm install
   ```
3. Run the app

   ```bash
   npm run start
   ```
The steps above are for running the project on the development server. You need the <mark>Expo Go</mark> app to be installed on your Android or IOS device to open the app.

If you want to create an actual installation file for either Android or IOS, follow the instructions here [Create your first build](https://docs.expo.dev/build/setup/).
> [!Note]
> This app  was created for Android and IOS only.

## Usage examples



## Future features

Except for improving overall design of the UI and adding dynamic to it I want to add such functionality:
- adding address information to be able to save and view utility bills history for different addresses.
- maybe to add the ability to actually pay for utilities through Liqpay service.

## Used tecnologies

- [Expo platform](https://github.com/expo/expo)
- [React native framework](https://github.com/facebook/react-native)
- [React native gifted charts](https://github.com/Abhinandan-Kushwaha/react-native-gifted-charts)
- [TypeScript](https://github.com/microsoft/TypeScript)
