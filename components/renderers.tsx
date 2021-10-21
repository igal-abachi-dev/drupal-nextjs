import {useAtom} from "jotai";
import {GlobalAppAtom} from "../atoms/store";
import {DateTime} from 'luxon';
import {sanitize} from "../hooks/useAxios";


const mapToBlogPost = (p: any, sanitize: (text: string) => string) => {
    let post = {
        id: p.nid[0].value,
        type: p.type[0].target_id,
        title: p.title[0].value,
        body: p.body[0].value,
        summery: p.body[0].summery,
        created: p.created[0].value,
        changed: p.changed[0].value,
    };
    if (sanitize != null) {
        post.body = sanitize(post.body);
        post.title = sanitize(post.title);
    }
    return post;
};


export function AllPostsRenderer(data: any) {
    // if (data == null || data.length == 0)
    //     return null;

    const posts = data.map(p => mapToBlogPost(p, sanitize));
    //console.log(posts);


    return posts.map(p => {
        return PostRenderer(p, true);
    });//.filter(p => p != null);
};


export function PostRenderer(data: any, wasMapped = false) {
    // if (data == null)
    //     return null;

    let p = wasMapped ? data : mapToBlogPost(data, sanitize);
    //console.log(p);

    //const [globalAppAtom, setGlobalAppAtom] = useAtom(GlobalAppAtom);

    return (<div key={'p-' + p.id}>
        {
            //              onMouseOver={e => setGlobalAppAtom(x => {
            //     x.light = !x.light;
            //     x.lastUpdate = DateTime.now().toString()
            // })}>
        }
        <h4>{p.title}</h4>
        <div
            dangerouslySetInnerHTML={{__html: p.body}}>
        </div>
    </div>);
};