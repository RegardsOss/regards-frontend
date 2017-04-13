/**
 * LICENSE_PLACEHOLDER
 **/

/**
 * Mock server response for UIPluginConfiguration entities
 * @author Léo Mieulet
 */
export default {
  content: [
    {
      content: {
        id: 1,
        active: true,
        default: false,
        pluginId: 2,
        conf: '{"label":"Configuration de service","static":{"static1":"V1","static2":"CV3"},"dynamic":{"dynamic1":"V2"}}',
      },
      links: [
        {
          rel: 'self',
          href: 'http://localhost:3333/unused',
        },
        {
          rel: 'delete',
          href: 'http://localhost:3333/unused',
        },
        {
          rel: 'update',
          href: 'http://localhost:3333/unused',
        },
        {
          rel: 'create',
          href: 'http://localhost:3333/unused',
        },
        {
          rel: 'list',
          href: 'http://localhost:3333/unused',
        },
      ],
    },
  ],
  metadata: {
    number: 1,
    size: 1,
    totalElements: 1,
  },
  links: [
    {
      rel: 'self',
      href: 'http://localhost:3333/unused',
    },
    {
      rel: 'delete',
      href: 'http://localhost:3333/unused',
    },
    {
      rel: 'update',
      href: 'http://localhost:3333/unused',
    },
    {
      rel: 'create',
      href: 'http://localhost:3333/unused',
    },
    {
      rel: 'list',
      href: 'http://localhost:3333/unused',
    },
  ],
}
