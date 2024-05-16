import { Component } from '@angular/core';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatDividerModule } from '@angular/material/divider';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-faq',
  standalone: true,
  imports: [MatExpansionModule, MatDividerModule, CommonModule],
  templateUrl: './faq.component.html',
  styleUrl: './faq.component.css',
})
export class FaqComponent {
  panelOpenState = false;

  faqs = [
    {
      question: 'How can I find the best-value hotels on Skyscanner?',
      answer:
        'Search your chosen destination for your selected dates and select ‘Best’. To be clear, by ‘Best’, we’re talking hotels we’ve gathered based on value for money, reviews, and location. If you’re looking for hotel deals specifically, take a look at our hotel deals page.',
    },
    {
      question: 'How does Skyscanner rank hotels?',
      answer:
        'There’s no secret recipe – just a stellar search operation. We scan all the top hotel provider sites, including Booking.com, Agoda, and Trip.com to name a few. From there, we compare prices and show you the best options. You can also select ‘Best’ to see our pick of the top hotels based on price, reviews, and location.',
    },
    {
      question: 'Do I book my hotel directly through Skyscanner?',
      answer:
        'No – as a travel search engine, we’ll show you a range of hotel deals, but we don’t take bookings or payments. Once you’ve chosen a hotel, we’ll transfer you to the hotel provider’s site to complete your booking.',
    },
    {
      question:
        'How do I know I’m getting a price that reflects the best value?',
      answer:
        'We always show the best-value price we can find from the hotel suppliers we offer, and give you the most up-to-date price overview.',
    },
    {
      question: 'How can Skyscanner help me plan my trip?',
      answer:
        'We make planning a breeze with simple search filters, handy hotel reviews, and accurate pricing. You can also keep everything in one place by comparing flight and car hire prices with us.',
    },
    {
      question:
        'Help! I have too many options. How can I decide which hotel to choose?',
      answer:
        'The choice overwhelm is real when searching for a hotel, but don’t panic! Get rid of the multiple tabs and windows, and think about what matters most. You may want to find hotels best for families, couples, or business trips. Or filter by must-haves, such as spa facilities or parking. Pop your preferences in your search, then watch only the super-relevant results roll in.',
    },
    {
      question: 'Will booking a hotel at the last minute be cheaper?',
      answer:
        'Possibly. It’s all down to supply and demand. If you’re booking a hotel in a quiet destination at a quiet time of year, there’ll likely be a steady stream of rooms available, so a last-minute booking will be cheaper. If you’re booking somewhere in a busy destination at a busy time of year, booking in advance will likely save you money.',
    },
    {
      question: 'Are hotels cheaper at certain times of the year than others?',
      answer:
        'They can be, yes. But it depends on a few things, such as the destination you have in mind, and room availability. There’s no exact science, so our advice would be to look out for hotel deals and promotions.',
    },
  ];
}
