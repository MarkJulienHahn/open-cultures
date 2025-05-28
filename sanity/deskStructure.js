import { orderableDocumentListDeskItem } from "@sanity/orderable-document-list";
import {
  UsersIcon,
  UserIcon,
  CalendarIcon,
  CommentIcon,
  EarthGlobeIcon,
  HomeIcon,
  RocketIcon,
  EqualIcon,
  LockIcon,
  JoystickIcon,
} from "@sanity/icons";

export const myStructure = (S, context) =>
  S.list()
    .title("Content")
    .items([
      orderableDocumentListDeskItem({
        type: "newsmeldung",
        title: "Newsmeldung",
        icon: CalendarIcon,
        S,
        context,
      }),

      S.listItem()
        .title("Team")
        .icon(UsersIcon)
        .child(
          S.list()
            .title("Site Content")
            .items([
              S.listItem()
                .title("Personen")
                .icon(UserIcon)
                .child(
                  S.documentTypeList("person")
                    .title("Person")
                    .filter('_type == "person"')
                    .defaultOrdering([
                      { field: "_createdAt", direction: "desc" },
                    ])
                ),
              orderableDocumentListDeskItem({
                type: "advisoryBoard",
                title: "AdvisoryBoard",
                icon: UsersIcon,
                S,
                context,
              }),
              orderableDocumentListDeskItem({
                type: "praxisPartners",
                title: "Praxis Partners",
                icon: UsersIcon,
                S,
                context,
              }),
            ])
        ),

      S.divider(),

      S.listItem()
        .title("Main Site")
        .icon(EarthGlobeIcon)
        .child(
          S.list()
            .title("Site Content")
            .items([
              S.listItem()
                .title("OpenCultures")
                .icon(EarthGlobeIcon)
                .child(
                  S.document()
                    .schemaType("openCultures")
                    .documentId("openCultures")
                ),
              S.divider(),
              S.listItem()
                .title("Team")
                .icon(UsersIcon)
                .child(S.document().schemaType("team").documentId("team")),
              S.divider(),
              S.listItem()
                .title("LivingLab")
                .icon(HomeIcon)
                .child(
                  S.document().schemaType("livingLab").documentId("linvingLab")
                ),
              S.divider(),
              S.listItem()
                .title("Interacting")
                .icon(JoystickIcon)
                .child(
                  S.document()
                    .schemaType("interacting")
                    .documentId("interacting")
                ),
              S.listItem()
                .title("Transdisciplinary MethodLab")
                .icon(JoystickIcon)
                .child(
                  S.document()
                    .schemaType("transdisciplinaryMethodLab")
                    .documentId("transdisciplinaryMethodLab")
                ),
              S.listItem()
                .title("Doctoral School")
                .icon(JoystickIcon)
                .child(
                  S.document()
                    .schemaType("methodologicalPhdColloquium")
                    .documentId("methodologicalPhdColloquium")
                ),
              S.listItem()
                .title("Summer Schools")
                .icon(JoystickIcon)
                .child(
                  S.document()
                    .schemaType("summerSchools")
                    .documentId("sumemrSchools")
                ),
              S.listItem()
                .title("Public Conferences")
                .icon(JoystickIcon)
                .child(
                  S.document()
                    .schemaType("conferences")
                    .documentId("conferences")
                ),
              S.divider(),
              S.listItem()
                .title("Mediating")
                .icon(CommentIcon)
                .child(
                  S.document().schemaType("mediating").documentId("mediating")
                ),
              S.listItem()
                .title("Printed Matter")
                .icon(CommentIcon)
                .child(
                  S.document()
                    .schemaType("printedMatter")
                    .documentId("printedMatter")
                ),
              S.listItem()
                .title("Spoken Word")
                .icon(CommentIcon)
                .child(
                  S.document().schemaType("spokenWord").documentId("spokenWord")
                ),

              S.divider(),
              S.listItem()
                .title("Impressum")
                .icon(EqualIcon)
                .child(
                  S.document().schemaType("impressum").documentId("impressum")
                ),
              S.listItem()
                .title("Datenschutz")
                .icon(LockIcon)
                .child(
                  S.document()
                    .schemaType("datenschutz")
                    .documentId("datenschutz")
                ),
              S.divider(),
              S.listItem()
                .title("Footer")
                .icon(EqualIcon)
                .child(S.document().schemaType("footer").documentId("footer")),
            ])
        ),

      S.divider(),

      S.listItem()
        .title("Sub Pages")
        .icon(EarthGlobeIcon)
        .child(
          S.list()
            .title("Site Content")
            .items([
              S.listItem()
                .title("OpenPlanning")
                .icon(EarthGlobeIcon)
                .child(
                  S.document()
                    .schemaType("openPlanning")
                    .documentId("openPlanning")
                ),
              S.listItem()
                .title("OpenFactoy")
                .icon(EarthGlobeIcon)
                .child(
                  S.document()
                    .schemaType("openFactory")
                    .documentId("openFactory")
                ),
              S.listItem()
                .title("OpenImaginaries")
                .icon(EarthGlobeIcon)
                .child(
                  S.document()
                    .schemaType("openImaginaries")
                    .documentId("openImaginaries")
                ),
            ])
        ),
      S.divider(),

      S.listItem()
        .title("Projekte")
        .icon(RocketIcon)
        .child(
          S.list()
            .title("Site Content")
            .items([
              orderableDocumentListDeskItem({
                type: "livingLabProject",
                title: "Living Lab",
                icon: HomeIcon,
                S,
                context,
              }),
              S.divider(),
              orderableDocumentListDeskItem({
                type: "transdisciplinaryMethodLabProject",
                title: "Transdisciplinary MethodLab",
                icon: JoystickIcon,
                S,
                context,
              }),

              orderableDocumentListDeskItem({
                type: "methodologicalPhdColloquiumProject",
                title: "Doctoral School",
                icon: JoystickIcon,
                S,
                context,
              }),

              orderableDocumentListDeskItem({
                type: "summerSchoolsProject",
                title: "Summer Schools",
                icon: JoystickIcon,
                S,
                context,
              }),
              orderableDocumentListDeskItem({
                type: "conferencesProject",
                title: "Public Conferences",
                icon: JoystickIcon,
                S,
                context,
              }),
              S.divider(),
              orderableDocumentListDeskItem({
                type: "spokenWordProject",
                title: "Spoken Word",
                icon: CommentIcon,
                S,
                context,
              }),
              orderableDocumentListDeskItem({
                type: "printedMatterProject",
                title: "Printed Matter",
                icon: CommentIcon,
                S,
                context,
              }),
            ])
        ),
    ]);
