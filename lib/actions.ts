"use server";
import { v4 as uuidv4 } from "uuid";
import prisma from "./prisma";

export async function createSmartCard(details: CardDetails) {
  console.log(details);

  const id = uuidv4();

  try {
    const data = await prisma.card.create({
      data: {
        linkId: id,
        images: {
          logo: details.images.logo,
          profile: details.images.profile,
          cover: details.images.cover,
        },
        personal: {
          name: details.personal.name,
          jobTitle: details.personal.jobTitle,
          department: details.personal.department,
          companyName: details.personal.companyName,
          accreditations: details.personal.accreditations,
          headline: details.personal.headline,
          bio: details.personal.bio,
        },
        general: {
          email: details.general.email,
          phone: details.general.phone,
          companyUrl: details.general.companyUrl,
          link: details.general.link,
          address: details.general.address,
        },
        social: {
          x: details.social.x,
          instagram: details.social.instagram,
          thread: details.social.thread,
          linkedin: details.social.linkedin,
          facebook: details.social.facebook,
          youtube: details.social.youtube,
          snapchat: details.social.snapchat,
          tiktok: details.social.tiktok,
          twitch: details.social.twitch,
        },
        chat: {
          whatsapp: details.chat.whatsapp,
        },
      },
    });

    return { status: 200, id: id, logo: data.images.logo };
  } catch (e) {
    console.error(e);
    return { status: 404, id: "", logo: "" };
  }
}

export async function getSmartCard(id: string) {
  const data = await prisma.card.findUnique({
    where: {
      linkId: id,
    },
    include: {
      personal: true,
      general: true,
      social: true,
      chat: true,
      images: true,
    },
  });

  return data;
}
