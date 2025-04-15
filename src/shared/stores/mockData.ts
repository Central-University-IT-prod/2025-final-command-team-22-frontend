import { IBusinessCard } from "@/shared/models/IBusinessCard";
import { ICoupon } from "@/shared/models/ICoupon";

export const name = "Мегазорд";
export const data = {
  totalPurchases: 234,
  freePurchases: 56,
};
export const qrValue = "1234567890";
export const Coupons: ICoupon[] = [
  {
    imageUrl:
      "https://plus.unsplash.com/premium_photo-1664391762371-ed00e19ddc7a?q=80&w=1963&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    couponId: "1",
    name: "Скидка 10%",
    has: 10,
    need: 100,
  },
  {
    imageUrl:
      "https://plus.unsplash.com/premium_photo-1664391762371-ed00e19ddc7a?q=80&w=1963&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",

    couponId: "2",
    name: "Скидка 20%",
    has: 20,
    need: 200,
  },
  {
    imageUrl:
      "https://plus.unsplash.com/premium_photo-1664391762371-ed00e19ddc7a?q=80&w=1963&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",

    couponId: "3",
    name: "Скидка 30%",
    has: 30,
    need: 300,
  },
  {
    imageUrl:
      "https://plus.unsplash.com/premium_photo-1664391762371-ed00e19ddc7a?q=80&w=1963&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",

    couponId: "4",
    name: "Скидка 40%",
    has: 40,
    need: 400,
  },
  {
    imageUrl:
      "https://plus.unsplash.com/premium_photo-1664391762371-ed00e19ddc7a?q=80&w=1963&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",

    couponId: "5",
    name: "Скидка 50%",
    has: 50,
    need: 500,
  },
];

export const availableCoupons: { business: IBusinessCard; coupons: ICoupon[] }[] = [
  {
    business: {
      businessId: "123",
      name: "NEPROD",
      description:
        "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis p",
      balance: 200,
      color: "#0d025e",
    },
    coupons: Coupons,
  },
  {
    business: {
      businessId: "223",
      name: "ProDano",
      description: "",
      balance: 12,
      color: "#5e0202",
    },
    coupons: Coupons,
  },
  {
    business: {
      businessId: "example",
      name: "Пример",
      description: "Увы увы увы Увы увы увы увы увы",
      balance: 1,
      color: "#4B0082",
    },
    coupons: Coupons,
  },
  {
    business: {
      businessId: "35",
      name: "Цветочный Рай",
      description: "Магазин свежих цветов и букетов. Доставка по городу.",
      balance: 15,
      color: "#FF69B4",
    },
    coupons: Coupons,
  },
  {
    business: {
      businessId: "42",
      name: "Книжный Клуб",
      description: "Большой выбор книг, канцелярии и подарков. Работаем с 2005 года.",
      balance: 30,
      color: "#8B4513",
    },
    coupons: Coupons,
  },
  {
    business: {
      businessId: "57",
      name: "Спорт Мастер",
      description: "Спортивная одежда, обувь и инвентарь. Консультации специалистов.",
      balance: 25,
      color: "#4169E1",
    },
    coupons: Coupons,
  },
  {
    business: {
      businessId: "89",
      name: "ТехноПлюс",
      description: "Магазин электроники и бытовой техники. Гарантия и сервисное обслуживание.",
      balance: 45,
      color: "#2F4F4F",
    },
    coupons: Coupons,
  },
];

export const businessCards: IBusinessCard[] = [
  {
    businessId: "123",
    name: "NEPROD",
    description:
      "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis p",
    balance: 200,
    color: "#0d025e",
  },
  {
    businessId: "223",
    name: "ProDano",
    description: "",
    balance: 12,
    color: "#5e0202",
  },
  {
    businessId: "example",
    name: "Пример",
    description: "Увы увы увы Увы увы увы увы увы",
    balance: 1,
    color: "#4B0082",
  },
  {
    businessId: "35",
    name: "Цветочный Рай",
    description: "Магазин свежих цветов и букетов. Доставка по городу.",
    balance: 15,
    color: "#FF69B4",
  },
  {
    businessId: "42",
    name: "Книжный Клуб",
    description: "Большой выбор книг, канцелярии и подарков. Работаем с 2005 года.",
    balance: 30,
    color: "#8B4513",
  },
  {
    businessId: "57",
    name: "Спорт Мастер",
    description: "Спортивная одежда, обувь и инвентарь. Консультации специалистов.",
    balance: 25,
    color: "#4169E1",
  },
  {
    businessId: "89",
    name: "ТехноПлюс",
    description: "Магазин электроники и бытовой техники. Гарантия и сервисное обслуживание.",
    balance: 45,
    color: "#2F4F4F",
  },
];
