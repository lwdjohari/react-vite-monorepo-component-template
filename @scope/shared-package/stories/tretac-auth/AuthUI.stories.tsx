import type { Meta, StoryObj } from '@storybook/react';
import { AuthUI } from '../../lib/main';
import { action } from '@storybook/addon-actions';

const meta: Meta<typeof AuthUI> = {
  title: 'Treta Comp/auth/AuthUI',
  component: AuthUI,
};

export default meta;
type Story = StoryObj<typeof AuthUI>;

export const Primary: Story = {
  args: {

    username: 'User',
    password: 'Password',
    onSubmit: (username: string, password: string) => {
      action(`Username: ${username}, Password: ${password}`, { clearOnStoryChange:false  })();
    }
  },
};

