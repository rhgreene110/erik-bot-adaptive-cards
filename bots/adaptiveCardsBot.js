// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

const { ActivityHandler, CardFactory } = require('botbuilder');

// Import AdaptiveCard content.
const FlightItineraryCard = require('../resources/FlightItineraryCard.json');
const ImageGalleryCard = require('../resources/ImageGalleryCard.json');
const LargeWeatherCard = require('../resources/LargeWeatherCard.json');
const RestaurantCard = require('../resources/RestaurantCard.json');
const SolitaireCard = require('../resources/SolitaireCard.json');

const VideoCard = require('../resources/VideoCard.json');

const card = CardFactory.videoCard(
    '2018 Imagine Cup World Championship Intro',
    [{ url: 'https://adaptivecardsblob.blob.core.windows.net/assets/AdaptiveCardsOverviewVideo.mp4' }],
    [{
        type: 'openUrl',
        title: 'Lean More',
        value: 'https://channel9.msdn.com/Events/Imagine-Cup/World-Finals-2018/2018-Imagine-Cup-World-Championship-Intro'
    }],
    {
        subtitle: 'by Microsoft',
        text: 'Microsoft\'s Imagine Cup has empowered student developers around the world to create and innovate on the world stage for the past 16 years. These innovations will shape how we live, work and play.'
    }
);

// Create array of AdaptiveCard content, this will be used to send a random card to the user.
const CARDS = [
    // FlightItineraryCard,
    // ImageGalleryCard,
    // LargeWeatherCard,
    // RestaurantCard,
    // SolitaireCard,
    VideoCard
];

const WELCOME_TEXT = 'This bot will introduce you to Adaptive Cards. Type anything to see an Adaptive Card.';

class AdaptiveCardsBot extends ActivityHandler {
    constructor() {
        super();
        this.onMembersAdded(async (context, next) => {
            const membersAdded = context.activity.membersAdded;
            for (let cnt = 0; cnt < membersAdded.length; cnt++) {
                if (membersAdded[cnt].id !== context.activity.recipient.id) {
                    await context.sendActivity(`Welcome to Adaptive Cards Bot  ${ membersAdded[cnt].name }. ${ WELCOME_TEXT }`);
                }
            }

            // By calling next() you ensure that the next BotHandler is run.
            await next();
        });

        this.onMessage(async (context, next) => {
            const randomlySelectedCard = CARDS[Math.floor((Math.random() * CARDS.length - 1) + 1)];
            // await context.sendActivity({
            //     text: 'Here is an Adaptive Card:',
            //     attachments: [CardFactory.adaptiveCard(randomlySelectedCard)]
            // });

            await context.sendActivity({
                text: 'Here is an Adaptive Card:',
                attachments: [card]
            });

            // By calling next() you ensure that the next BotHandler is run.
            await next();
        });
    }
}

module.exports.AdaptiveCardsBot = AdaptiveCardsBot;
