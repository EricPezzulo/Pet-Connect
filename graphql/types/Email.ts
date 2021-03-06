import { extendType, nonNull, objectType, stringArg } from "nexus";
import SendMail from '../../utils/mail'

export const Email = objectType({
  name: "Email",
  definition(t: any) {
    t.string("id"),
      t.string("recipient"),
      t.string("emailContent"),
      t.string("subject");
  },
});

export const SendEmail = extendType({
  type: "Mutation",
  definition(t: any) {
    t.field("sendEmail", {
      type: "Email",
      args: {
        recipient: nonNull(stringArg()),
        emailContent: nonNull(stringArg()),
        subject: nonNull(stringArg()),
      },
      async resolve(_: any, args: any, context: any) {
        const newEmail = {
          recipient: args.recipient,
          emailContent: args.emailContent,
          subject: args.subject,
        };
        await SendMail(newEmail);
        return newEmail;
      },
    });
    return;
  },
});
