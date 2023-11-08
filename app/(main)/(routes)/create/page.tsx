import { Separator } from '@/components/ui/separator';
import Heading from '@/components/heading';
import CreateForm from '@/components/create-form';

const CreatePage = () => {
  return (
    <div>
      <div className="flex items-center justify-between">
        <Heading title="Create Post" subtitle="Make great article!" />
      </div>
      <Separator className="my-4" />
      <CreateForm />
    </div>
  );
};

export default CreatePage;
